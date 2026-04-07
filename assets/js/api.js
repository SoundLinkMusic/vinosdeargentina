/**
 * API Module - Integración con backend (Supabase y Stripe)
 * Estructura para llamadas HTTP y gestión de datos
 */

const APIModule = (() => {
  const config = API_CONFIG;

  // Obtener catálogo de vinos desde JSON
  const getWines = async () => {
    try {
      const response = await fetch(config.WINES_DATA);
      if (!response.ok) throw new Error('Error cargando catálogo');
      return await response.json();
    } catch (error) {
      console.error('Error en getWines:', error);
      return [];
    }
  };

  // Obtener vino por ID
  const getWineById = async (id) => {
    const wines = await getWines();
    return wines.find(w => w.id === id) || null;
  };

  // Filtrar vinos
  const filterWines = async (filters) => {
    let wines = await getWines();

    if (filters.type) {
      wines = wines.filter(w => filters.type.includes(w.type));
    }
    if (filters.region) {
      wines = wines.filter(w => filters.region.includes(w.region));
    }
    if (filters.box) {
      wines = wines.filter(w => filters.box.includes(w.box));
    }
    if (filters.priceMax) {
      wines = wines.filter(w => w.price <= filters.priceMax);
    }

    return wines;
  };

  // Crear orden (preparado para Supabase)
  const createOrder = async (orderData) => {
    try {
      // TODO: POST a Supabase
      const order = {
        id: crypto.randomUUID(),
        ...orderData,
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Orden creada (mock):', order);
      return { order };
    } catch (error) {
      console.error('Error creando orden:', error);
      return { error: 'No se pudo crear la orden' };
    }
  };

  // Procesar pago con Stripe (preparado)
  const createPaymentIntent = async (amount, currency = 'EUR') => {
    try {
      // TODO: POST a backend para crear PaymentIntent
      console.log('PaymentIntent creado (mock):', { amount, currency });
      return { clientSecret: 'pi_mock_' + Math.random() };
    } catch (error) {
      console.error('Error en pago:', error);
      return { error: 'No se pudo procesar el pago' };
    }
  };

  // Obtener órdenes del usuario (preparado para Supabase)
  const getUserOrders = async (userId) => {
    try {
      // TODO: GET a Supabase
      console.log('Órdenes obtenidas (mock) para usuario:', userId);
      return { orders: [] };
    } catch (error) {
      console.error('Error obteniendo órdenes:', error);
      return { error: 'No se pudieron obtener las órdenes' };
    }
  };

  // Calcular total con impuestos
  const calculateTotal = (items, userDiscountPercent = 0) => {
    let subtotal = 0;

    items.forEach(item => {
      const pricePerUnit = item.price || 0;
      const quantity = item.quantity || 1;
      subtotal += pricePerUnit * quantity;
    });

    // Aplicar descuento del usuario
    if (userDiscountPercent > 0) {
      subtotal *= (1 - userDiscountPercent / 100);
    }

    // Aplicar IGIC Canarias
    const igic = subtotal * config.TAXES.IGIC_CANARIAS;
    const total = subtotal + igic;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      igic: parseFloat(igic.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  };

  return {
    getWines,
    getWineById,
    filterWines,
    createOrder,
    createPaymentIntent,
    getUserOrders,
    calculateTotal
  };
})();
