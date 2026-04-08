-- Reset orders table schema to match checkout.html payload
DROP TABLE IF EXISTS public.orders CASCADE;

CREATE TABLE public.orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  island TEXT,
  address TEXT,
  postal_code TEXT,
  subtotal_amount DECIMAL(10,2),
  tax_amount DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  items JSONB,
  payment_method TEXT,
  payment_status TEXT,
  shipping_status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
