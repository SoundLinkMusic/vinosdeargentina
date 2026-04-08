-- De Altura Wines - Database Schema para Supabase

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'horeca', 'admin')),
  discount_percent INTEGER DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Vinos (Catálogo)
CREATE TABLE IF NOT EXISTS wines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bodega TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('norte', 'cuyo', 'patagonia')),
  type TEXT NOT NULL CHECK (type IN ('tinto', 'blanco', 'rosado')),
  price_retail DECIMAL(8,2) NOT NULL,
  price_horeca DECIMAL(8,2) NOT NULL,
  aiem_rate DECIMAL(4,2) DEFAULT 0.15,
  igic_rate DECIMAL(4,2) DEFAULT 0.07,
  box_size INTEGER NOT NULL,
  notes_es TEXT,
  notes_en TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Órdenes
CREATE TABLE IF NOT EXISTS orders (
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

-- Tabla de Items de Órdenes
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  wine_id TEXT NOT NULL REFERENCES wines(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(8,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Transacciones Bancarias (para método transfer)
CREATE TABLE IF NOT EXISTS bank_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  bank_account TEXT,
  reference_number TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wines_region ON wines(region);
CREATE INDEX IF NOT EXISTS idx_wines_type ON wines(type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- RLS (Row Level Security) - Preparado para activar después
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can see their own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');
