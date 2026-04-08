-- Disable RLS and allow anon inserts
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;

-- Drop any existing RLS policies
DROP POLICY IF EXISTS "Enable insert for anon" ON public.orders;
DROP POLICY IF EXISTS "Enable read for anon" ON public.orders;
DROP POLICY IF EXISTS "Enable insert for anon" ON public.order_items;
DROP POLICY IF EXISTS "Enable read for anon" ON public.order_items;
