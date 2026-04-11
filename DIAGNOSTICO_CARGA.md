# 🔧 Diagnóstico de Carga - index.html

## ¿Qué hacer si localhost no carga?

### PASO 1: Abre la Consola del Navegador
1. Presiona: **F12** (o Cmd+Option+I en Mac)
2. Ve a la pestaña **Console**
3. Busca mensajes de error en rojo

### PASO 2: Copia y Pega en la Consola

Ejecuta esto en la consola del navegador:

```javascript
// Test 1: Verificar Supabase
console.log('✓ Test 1: Supabase disponible?', !!window.supabase);

// Test 2: Verificar APIModule
console.log('✓ Test 2: APIModule disponible?', !!APIModule);

// Test 3: Verificar DOM
console.log('✓ Test 3: Elementos del DOM');
console.log('  - filter-box:', !!document.getElementById('filter-box'));
console.log('  - sort-price:', !!document.getElementById('sort-price'));
console.log('  - container-buenos-aires:', !!document.getElementById('container-buenos-aires'));
console.log('  - container-norte:', !!document.getElementById('container-norte'));
console.log('  - section-buenos-aires:', !!document.getElementById('section-buenos-aires'));

// Test 4: Verificar catalogData
console.log('✓ Test 4: catalogData', catalogData ? 'existe' : 'NO EXISTE');
console.log('  - Cantidad de elementos:', catalogData ? catalogData.length : 0);

// Test 5: Intentar cargar vinos manualmente
APIModule.getWines().then(wines => {
    console.log('✓ Test 5: getWines() funcionó');
    console.log('  - Vinos obtenidos:', wines.length);
    if (wines.length > 0) {
        console.log('  - Primer vino:', wines[0]);
    }
}).catch(error => {
    console.error('❌ Test 5: Error en getWines()');
    console.error('  -', error.message);
});
```

---

## 🔍 Qué Verificar

### Si ves errores de Supabase
```
❌ Error: window.supabase is not defined
```

**Solución:**
- Espera 5 segundos y recarga la página
- Verifica tu conexión a Internet
- Comprueba que CDN de Supabase está accesible

### Si ves errores de getWines()
```
❌ Error: Cannot read property 'from' of undefined
```

**Solución:**
- Verifica que SUPABASE_URL y SUPABASE_ANON_KEY sean válidos
- Verifica que el proyecto Supabase esté accesible
- Revisa que tengas permiso para acceder a la tabla 'products'

### Si falta catalogData
```
catalogData existe: false
```

**Solución:**
- initCatalog() no se llamó
- Verifica que getWines() retorne datos
- Abre la consola y revisa si hay errores

---

## 📋 Checklist Rápido

- [ ] Archivo index.html existe en: `/Users/macbookair/Downloads/vinosweb/vinosdeargentina/index.html`
- [ ] Puedes abrir localhost sin errores de conexión
- [ ] Presionas F12 y ves la consola
- [ ] Ejecutas los tests de arriba
- [ ] Verificas que cada test diga ✓ o ✗

---

## 🚨 Si Nada Funciona

1. **Cierra y abre el navegador nuevamente**
2. **Limpia cache**: Ctrl+Shift+Suprimir (Windows) o Cmd+Shift+Supr (Mac)
3. **Verifica que localhost esté corriendo** en http://localhost:8000 (o tu puerto)
4. **Revisa que el servidor HTTP esté activo** (python -m http.server)
5. **Abre la consola y busca errores de CORS o Network**

---

## 📝 Archivos que se Mejoraron

- ✅ `index.html` - Agregadas validaciones de carga y fallbacks
  - initAPIModule() ahora espera a Supabase
  - initCatalog() ahora espera a APIModule
  - renderCatalog() valida que elementos existan
  - Manejo de errores con try/catch

---

## 💡 Lo que Debería Pasar

1. Cargas localhost
2. Ves "De Altura Wines" en el título
3. Ves la barra de colores en la parte superior
4. Ves el formulario de filtros
5. Ves "Buenos Aires" como primera sección
6. Ves vinos con imágenes

Si ves todo esto, **¡todo funciona!** 🎉

---

## 🔗 Recursos

- Consola del navegador: F12
- Network tab: Ver qué archivos se cargan
- Application tab: Ver localStorage y cookies
- Console tab: Ver logs y errores

---

Cuando hayas hecho los tests, **comparte los resultados** para que podamos saber exactamente qué no funciona.

