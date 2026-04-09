#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Migration SQL file
const migrationPath = path.join(__dirname, 'supabase/migrations/20260408_load_31_wines.sql');
const sql = fs.readFileSync(migrationPath, 'utf-8');

// Supabase credentials from HTML config
const SUPABASE_URL = 'https://pzzbvinbyzaxrshlmlcn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6emJ2aW5ieXpheHJzaGxtbGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTI5NDYsImV4cCI6MjA5MTEyODk0Nn0.YgeGDVZfyqI-nv7iAhROMsBfZbIK7BGUDyU1ERE-SFA';

// Make HTTPS request to execute SQL via RPC
function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, SUPABASE_URL);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ sql }));
    req.end();
  });
}

// Alternative: Insert wines directly via REST API
async function insertWines() {
  // Parse wines from migration
  const winesMatch = sql.match(/INSERT INTO public\.wines.*?VALUES\s*([\s\S]*?);/);
  if (!winesMatch) {
    throw new Error('Could not parse wines from migration');
  }

  // Simple wine data structure (extracted manually) - NO notes_es/notes_en to avoid schema cache issues
  const wines = [
    { id: 'llama-malbec-2025', name: 'The Llama Malbec 2025', bodega: 'Viñas en Flor', region: 'norte', type: 'tinto', price_retail: 12.28, price_horeca: 10.44, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'llama-torrontes-2025', name: 'The Llama Torrontés 2025', bodega: 'Viñas en Flor', region: 'norte', type: 'blanco', price_retail: 12.28, price_horeca: 10.44, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'llama-rose-2025', name: 'The Llama Rosé 2025', bodega: 'Viñas en Flor', region: 'norte', type: 'rosado', price_retail: 12.28, price_horeca: 10.44, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'punta-corral-2022', name: 'Punta Corral 2022', bodega: 'Bodega Fernando Dupont', region: 'norte', type: 'tinto', price_retail: 21.67, price_horeca: 18.42, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'franc-dupont-2022', name: 'Franc Dupont 2022', bodega: 'Bodega Fernando Dupont', region: 'norte', type: 'tinto', price_retail: 27.45, price_horeca: 23.33, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'sikuri-2022', name: 'Sikuri 2022', bodega: 'Bodega Fernando Dupont', region: 'norte', type: 'tinto', price_retail: 27.45, price_horeca: 23.33, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'pascana-2021', name: 'Pascana 2021', bodega: 'Bodega Fernando Dupont', region: 'norte', type: 'tinto', price_retail: 40.45, price_horeca: 34.38, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'coquena-tannat-2025', name: 'Coquena Tannat 2025', bodega: 'Bodega Yacochuya', region: 'norte', type: 'tinto', price_retail: 14.45, price_horeca: 12.28, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'ilogico-malbec-2020', name: 'Ilógico Malbec 2020', bodega: 'Agustin Lanus Wines', region: 'norte', type: 'tinto', price_retail: 24.56, price_horeca: 20.88, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'ilogico-criolla-2022', name: 'Ilógico Criolla 2022', bodega: 'Agustin Lanus Wines', region: 'norte', type: 'tinto', price_retail: 21.67, price_horeca: 18.42, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'atypico-2018', name: 'Atypico 2018', bodega: 'Agustin Lanus Wines', region: 'norte', type: 'tinto', price_retail: 40.45, price_horeca: 34.38, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    // Cuyo (16)
    { id: 'cabernet-franc-2024', name: 'Cabernet Franc 2024', bodega: 'Nido del Tigre', region: 'cuyo', type: 'tinto', price_retail: 15.17, price_horeca: 12.89, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'alcaparrosa-2023', name: 'Alcaparrosa 2023', bodega: 'Nido del Tigre', region: 'cuyo', type: 'tinto', price_retail: 15.17, price_horeca: 12.89, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'ripasso-2024', name: 'Ripasso 2024', bodega: 'Nido del Tigre', region: 'cuyo', type: 'tinto', price_retail: 15.17, price_horeca: 12.89, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'orange-field-2024', name: 'Orange Field 2024', bodega: 'Paso a Paso Wines', region: 'cuyo', type: 'blanco', price_retail: 15.89, price_horeca: 13.51, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'abandonados-semillon-2022', name: 'Abandonados Semillón 2022', bodega: 'Paso a Paso Wines', region: 'cuyo', type: 'blanco', price_retail: 24.56, price_horeca: 20.88, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'criolla-clarete-2025', name: 'Criolla Clarete 2025', bodega: 'Paso a Paso Wines', region: 'cuyo', type: 'rosado', price_retail: 13.72, price_horeca: 11.66, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'criolla-blanca-2025', name: 'Criolla Blanca 2025', bodega: 'Paso a Paso Wines', region: 'cuyo', type: 'blanco', price_retail: 13.72, price_horeca: 11.66, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'gran-sombrerero-malbec-2023', name: 'Gran Sombrerero Malbec 2023', bodega: 'Huentala Wines', region: 'cuyo', type: 'tinto', price_retail: 18.78, price_horeca: 15.96, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'gran-sombrerero-chardonnay-2023', name: 'Gran Sombrerero Chardonnay 2023', bodega: 'Huentala Wines', region: 'cuyo', type: 'blanco', price_retail: 17.33, price_horeca: 14.73, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'dreidel-malbec-mevushal-verde-2021', name: 'Dreidel Malbec Mevushal Verde 2021', bodega: 'Huentala Wines', region: 'cuyo', type: 'tinto', price_retail: 15.89, price_horeca: 13.51, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'dreidel-malbec-no-mevushal-azul-2021', name: 'Dreidel Malbec No-Mevushal Azul 2021', bodega: 'Huentala Wines', region: 'cuyo', type: 'tinto', price_retail: 20.22, price_horeca: 17.19, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'dreidel-malbec-no-mevushal-negro-2021', name: 'Dreidel Malbec No-Mevushal Negro 2021', bodega: 'Huentala Wines', region: 'cuyo', type: 'tinto', price_retail: 31.78, price_horeca: 27.01, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'blanc-de-malbec-2023', name: 'Blanc De Malbec 2023', bodega: 'Coloso Wines', region: 'cuyo', type: 'blanco', price_retail: 13.72, price_horeca: 11.66, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'buenos-aires-malbec-2024', name: 'Buenos Aires Malbec 2024', bodega: 'Buenos Aires', region: 'cuyo', type: 'tinto', price_retail: 7.22, price_horeca: 6.14, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'buenos-aires-chardonnay-2024', name: 'Buenos Aires Chardonnay 2024', bodega: 'Buenos Aires', region: 'cuyo', type: 'blanco', price_retail: 7.22, price_horeca: 6.14, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'buenos-aires-malbec-reserva-2022', name: 'Buenos Aires Malbec Reserva 2022', bodega: 'Buenos Aires', region: 'cuyo', type: 'tinto', price_retail: 9.39, price_horeca: 7.98, box_size: 12, aiem_rate: 0.15, igic_rate: 0.07 },
    // Patagonia (4)
    { id: 'merlot-2020', name: 'Merlot 2020', bodega: 'Bodega del Desierto', region: 'patagonia', type: 'tinto', price_retail: 17.33, price_horeca: 14.73, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'cabernet-franc-2019', name: 'Cabernet Franc 2019', bodega: 'Bodega del Desierto', region: 'patagonia', type: 'tinto', price_retail: 17.33, price_horeca: 14.73, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'pinot-noir-2021', name: 'Pinot Noir 2021', bodega: 'Bodega del Desierto', region: 'patagonia', type: 'tinto', price_retail: 17.33, price_horeca: 14.73, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
    { id: 'pampeano-pinot-noir-2024', name: 'Pampeano Pinot Noir 2024', bodega: 'Bodega del Desierto', region: 'patagonia', type: 'tinto', price_retail: 14.45, price_horeca: 12.28, box_size: 6, aiem_rate: 0.15, igic_rate: 0.07 },
  ];

  console.log(`📦 Inserting ${wines.length} wines...`);

  const options = {
    hostname: 'pzzbvinbyzaxrshlmlcn.supabase.co',
    port: 443,
    path: '/rest/v1/wines?apikey=' + SUPABASE_ANON_KEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    }
  };

  for (const wine of wines) {
    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 400 && res.statusCode !== 409) {
            console.error(`❌ Error inserting ${wine.id}:`, data);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve();
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify([wine]));
      req.end();
    });
  }

  console.log('✅ All wines inserted!');
}

// Run
insertWines().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
