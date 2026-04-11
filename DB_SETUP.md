# 🗄️ Setup de Base de Datos - De Altura Wines

## FASE 1: Actualizar Tabla 'products' en Supabase

### Paso 1: Ejecutar SQL en Supabase

1. Accede a tu proyecto en **Supabase Dashboard**: https://app.supabase.com
2. Abre **SQL Editor** (en el sidebar izquierdo)
3. Copia y pega el siguiente SQL:

```sql
-- Agregar columna provincia a tabla products
ALTER TABLE products ADD COLUMN provincia TEXT;

-- Crear índice para búsquedas rápidas por provincia
CREATE INDEX idx_products_provincia ON products(provincia);

-- Comentario descriptivo
COMMENT ON COLUMN products.provincia IS 'Provincia argentina donde se ubica la bodega productora del vino';
```

4. **Ejecuta el SQL** haciendo clic en el botón ▶️ (Run)

✅ Una vez completado, deberías ver el mensaje de éxito.

---

### Paso 2: Ejecutar Script de Actualización de Datos (Opcional)

Después de crear la columna, puedes ejecutar el script para actualizar los registros (aunque el frontend ya mapea las provincias desde el bodega):

```bash
node db-update.js
```

---

## 📊 Mapeo de Bodegas → Provincias

El sistema automáticamente mapea cada bodega a su provincia correspondiente:

| Provincia | Bodegas |
|-----------|---------|
| **Salta** | Viñas en Flor, The Llama, Bodega Yacochuya, Coquena, Agustín Lanús Wines |
| **Jujuy** | Bodega Fernando Dupont |
| **San Juan** | Nido del Tigre |
| **Mendoza** | Paso a Paso, Huentala Wines, Colosso Wines, Buenos Aires |
| **La Pampa** | Bodega del Desierto |

---

## 🎯 Cambios Implementados

### ✅ Frontend (index.html)
- ✓ Reorganizado: **Buenos Aires es ahora la primera sección**
- ✓ Agregados **filtros por Provincia** (Todas, Salta, Jujuy, Mendoza, San Juan, La Pampa)
- ✓ Filtros ahora son **acumulativos** (Tipo + Provincia + Formato funcionan juntos)
- ✓ Cada tarjeta muestra `{Provincia}, Argentina` bajo el nombre de la bodega
- ✓ Secciones se ocultan automáticamente si no tienen vinos
- ✓ Mantiene **traducción bilingüe** (ES/EN) en todos los nuevos elementos

### ✅ Orden de Consulta
Vinos ordenados por:
1. **Provincia** (Buenos Aires primero, luego Salta, Jujuy, Mendoza, San Juan, La Pampa)
2. **Bodega** (alfabético)
3. **Precio** (ascendente)

### ✅ Secciones (en orden de aparición)
1. **Costa Atlántica / Buenos Aires** - Bodega "Buenos Aires" (Mendoza)
2. **Norte Argentino** - Salta y Jujuy
3. **Región de Cuyo** - Mendoza y San Juan
4. **Patagonia Argentina** - La Pampa

---

## 🛠️ Archivos Creados/Modificados

- `index.html` - Actualizado con nuevas secciones, filtros y lógica
- `migrations/001-add-provincia.sql` - Script de migración
- `db-update.js` - Script para actualizar datos (solo después de crear columna)
- `setup-db.js` - Asistente interactivo (opcional)
- `DB_SETUP.md` - Este archivo

---

## 📝 Notas Importantes

- El **frontend ya mapea provincias desde bodegas**, así que funciona inmediatamente
- El **ALTER TABLE es opcional** si solo quieres usar el frontend
- Si ejecutas el SQL, el script `db-update.js` actualizará los registros automáticamente
- El **Grid y imágenes transparentes se mantienen intactos**
- No se rompió **ninguna funcionalidad existente**

---

## 🚀 Verificación

Para verificar que todo funciona:

1. Abre `index.html` en el navegador
2. Verifica que **Buenos Aires sea la primera sección**
3. Prueba los **filtros de provincia**
4. Verifica que las **secciones se oculten** si no hay vinos
5. Comprueba que el **badge de provincia** aparece en cada tarjeta

---

¡Sistema listo! 🎉
