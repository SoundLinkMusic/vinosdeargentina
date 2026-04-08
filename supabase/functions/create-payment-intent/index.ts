import Stripe from 'https://esm.sh/stripe@latest?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Cuerpo recibido:", body);
    const { amount } = body;

    // Inicializar Stripe con la SECRET KEY
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    });

    // Crear Payment Intent
    const amountInCents = Math.floor(Number(amount) * 100);
    console.log("Amount recibido:", amount);
    console.log("Amount en centavos (floor):", amountInCents);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      description: 'De Altura Wines - Pedido',
    });

    console.log("Payment Intent creado exitosamente:", paymentIntent.id);

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creando Payment Intent:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error desconocido',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
