-- Migration: Agregar columna 'provincia' a tabla 'products'
-- Descripción: Nuevo campo para clasificar vinos por provincia argentina

ALTER TABLE products ADD COLUMN provincia TEXT;

-- Crear índice para búsquedas por provincia
CREATE INDEX idx_products_provincia ON products(provincia);

-- Comentario en la columna
COMMENT ON COLUMN products.provincia IS 'Provincia argentina donde se ubica la bodega productora del vino';
