-- Cargar los 31 vinos en la tabla wines (que el frontend espera)
-- Primero, vaciar la tabla
DELETE FROM public.wines;

-- Insertar los 31 vinos
INSERT INTO public.wines (id, name, bodega, region, type, price_retail, price_horeca, box_size, notes_es, notes_en, aiem_rate, igic_rate) VALUES
-- Región Norte (11)
('llama-malbec-2025', 'The Llama Malbec 2025', 'Viñas en Flor', 'norte', 'tinto', 12.28, 10.44, 6, '', '', 0.15, 0.07),
('llama-torrontes-2025', 'The Llama Torrontés 2025', 'Viñas en Flor', 'norte', 'blanco', 12.28, 10.44, 6, '', '', 0.15, 0.07),
('llama-rose-2025', 'The Llama Rosé 2025', 'Viñas en Flor', 'norte', 'rosado', 12.28, 10.44, 6, '', '', 0.15, 0.07),
('punta-corral-2022', 'Punta Corral 2022', 'Bodega Fernando Dupont', 'norte', 'tinto', 21.67, 18.42, 6, '', '', 0.15, 0.07),
('franc-dupont-2022', 'Franc Dupont 2022', 'Bodega Fernando Dupont', 'norte', 'tinto', 27.45, 23.33, 6, '', '', 0.15, 0.07),
('sikuri-2022', 'Sikuri 2022', 'Bodega Fernando Dupont', 'norte', 'tinto', 27.45, 23.33, 6, '', '', 0.15, 0.07),
('pascana-2021', 'Pascana 2021', 'Bodega Fernando Dupont', 'norte', 'tinto', 40.45, 34.38, 6, '', '', 0.15, 0.07),
('coquena-tannat-2025', 'Coquena Tannat 2025', 'Bodega Yacochuya', 'norte', 'tinto', 14.45, 12.28, 6, '', '', 0.15, 0.07),
('ilogico-malbec-2020', 'Ilógico Malbec 2020', 'Agustin Lanus Wines', 'norte', 'tinto', 24.56, 20.88, 6, '', '', 0.15, 0.07),
('ilogico-criolla-2022', 'Ilógico Criolla 2022', 'Agustin Lanus Wines', 'norte', 'tinto', 21.67, 18.42, 6, '', '', 0.15, 0.07),
('atypico-2018', 'Atypico 2018', 'Agustin Lanus Wines', 'norte', 'tinto', 40.45, 34.38, 6, '', '', 0.15, 0.07),

-- Región Cuyo (16)
('cabernet-franc-2024', 'Cabernet Franc 2024', 'Nido del Tigre', 'cuyo', 'tinto', 15.17, 12.89, 6, '', '', 0.15, 0.07),
('alcaparrosa-2023', 'Alcaparrosa 2023', 'Nido del Tigre', 'cuyo', 'tinto', 15.17, 12.89, 6, '', '', 0.15, 0.07),
('ripasso-2024', 'Ripasso 2024', 'Nido del Tigre', 'cuyo', 'tinto', 15.17, 12.89, 6, '', '', 0.15, 0.07),
('orange-field-2024', 'Orange Field 2024', 'Paso a Paso Wines', 'cuyo', 'blanco', 15.89, 13.51, 12, '', '', 0.15, 0.07),
('abandonados-semillon-2022', 'Abandonados Semillón 2022', 'Paso a Paso Wines', 'cuyo', 'blanco', 24.56, 20.88, 6, '', '', 0.15, 0.07),
('criolla-clarete-2025', 'Criolla Clarete 2025', 'Paso a Paso Wines', 'cuyo', 'rosado', 13.72, 11.66, 12, '', '', 0.15, 0.07),
('criolla-blanca-2025', 'Criolla Blanca 2025', 'Paso a Paso Wines', 'cuyo', 'blanco', 13.72, 11.66, 12, '', '', 0.15, 0.07),
('gran-sombrerero-malbec-2023', 'Gran Sombrerero Malbec 2023', 'Huentala Wines', 'cuyo', 'tinto', 18.78, 15.96, 6, '', '', 0.15, 0.07),
('gran-sombrerero-chardonnay-2023', 'Gran Sombrerero Chardonnay 2023', 'Huentala Wines', 'cuyo', 'blanco', 17.33, 14.73, 6, '', '', 0.15, 0.07),
('dreidel-malbec-mevushal-verde-2021', 'Dreidel Malbec Mevushal Verde 2021', 'Huentala Wines', 'cuyo', 'tinto', 15.89, 13.51, 6, '', '', 0.15, 0.07),
('dreidel-malbec-no-mevushal-azul-2021', 'Dreidel Malbec No-Mevushal Azul 2021', 'Huentala Wines', 'cuyo', 'tinto', 20.22, 17.19, 6, '', '', 0.15, 0.07),
('dreidel-malbec-no-mevushal-negro-2021', 'Dreidel Malbec No-Mevushal Negro 2021', 'Huentala Wines', 'cuyo', 'tinto', 31.78, 27.01, 6, '', '', 0.15, 0.07),
('blanc-de-malbec-2023', 'Blanc De Malbec 2023', 'Coloso Wines', 'cuyo', 'blanco', 13.72, 11.66, 6, '', '', 0.15, 0.07),
('buenos-aires-malbec-2024', 'Buenos Aires Malbec 2024', 'Buenos Aires', 'cuyo', 'tinto', 7.22, 6.14, 12, '', '', 0.15, 0.07),
('buenos-aires-chardonnay-2024', 'Buenos Aires Chardonnay 2024', 'Buenos Aires', 'cuyo', 'blanco', 7.22, 6.14, 12, '', '', 0.15, 0.07),
('buenos-aires-malbec-reserva-2022', 'Buenos Aires Malbec Reserva 2022', 'Buenos Aires', 'cuyo', 'tinto', 9.39, 7.98, 12, '', '', 0.15, 0.07),

-- Región Patagonia (4)
('merlot-2020', 'Merlot 2020', 'Bodega del Desierto', 'patagonia', 'tinto', 17.33, 14.73, 6, '', '', 0.15, 0.07),
('cabernet-franc-2019', 'Cabernet Franc 2019', 'Bodega del Desierto', 'patagonia', 'tinto', 17.33, 14.73, 6, '', '', 0.15, 0.07),
('pinot-noir-2021', 'Pinot Noir 2021', 'Bodega del Desierto', 'patagonia', 'tinto', 17.33, 14.73, 6, '', '', 0.15, 0.07),
('pampeano-pinot-noir-2024', 'Pampeano Pinot Noir 2024', 'Bodega del Desierto', 'patagonia', 'tinto', 14.45, 12.28, 6, '', '', 0.15, 0.07);

-- Confirmación
SELECT COUNT(*) as total_wines FROM public.wines;
