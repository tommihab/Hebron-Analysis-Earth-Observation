/**
 * Vegetation Loss Detection – Hebron, West Bank (2020–2026)
 * Paste into https://code.earthengine.google.com and click Run.
 *
 * Objective:
 * Detect potential vegetation loss by comparing a 2020–2022
 * baseline with 2026 using Sentinel-2 imagery.
 *
 * Data:
 *  - Sentinel-2 Level-2A Surface Reflectance (10 m)
 *  - ESA WorldCover 2020 (10 m)
 *  - Hebron Area of Interest (AOI)
 *
 * Methodology:
 *  1. Apply SCL-based cloud masking to Sentinel-2 imagery.
 *  2. Generate annual dry-season composites (June–September).
 *  3. Calculate vegetation indices, using MSAVI2 as the primary index.
 *  4. Establish the 2020–2022 baseline (mean and standard deviation).
 *  5. Identify stable vegetation using ESA WorldCover classes
 *     (trees, shrubs, cropland) and MSAVI2 thresholds:
 *       - Baseline mean >= 0.14
 *       - Baseline standard deviation <= 0.06
 *  6. Detect potential loss in 2026 using:
 *       - MSAVI2 change < -0.05
 *       - Z-score < -2.5 (standard deviation floor: 0.02)
 *  7. Remove isolated detections (< 5 connected pixels).
 *  8. Export results for analysis and visualisation in ArcGIS Pro.
 *
 * Resolution: 10 m | CRS: EPSG:32636
 *
 * Limitations:
 * Detected changes indicate potential vegetation decline, not
 * confirmed removal or specific olive grove loss. Results have
 * not been independently validated.
 */

// ============================ 1. CONFIG ============================
var INDEX = 'MSAVI2';        // main index: 'MSAVI2' | 'SAVI' | 'NDVI' | 'EVI'
var COMPARE = ['NDVI', 'SAVI', 'MSAVI2', 'EVI'];

// Changed baseline years

var BASE_YEARS = [2020, 2021, 2022];
var POST_YEAR = 2026;

var DRY_START_MD = [6, 1];   // Jun 1
var DRY_END_MD = [9, 30];    // Sep 30



// Replaced the code for our AOI


var SITES = ee.FeatureCollection(
  'projects/geohum-action/assets/hebron_aoi'
);

var AOI = SITES.geometry();

Map.centerObject(AOI, 10);
Map.addLayer(SITES, {color: 'yellow'}, 'Hebron AOI');

print('AOI area (km²)', AOI.area().divide(1e6));





// Thresholds (index units). Starting values, tune them.
var BASE_MIN = {NDVI: 0.25, SAVI: 0.15, MSAVI2: 0.14, EVI: 0.13}; // min dry-season greenness
var STD_MAX = 0.06;     // max baseline year-to-year std (drops unstable fields)
var DELTA_MIN = 0.05;   // minimum absolute drop vs baseline
var Z_THR = 2.5;        // drop must exceed this many baseline std devs
var MIN_PX = 5;         // min connected pixels (5 px = 0.05 ha at 10 m)
var ANOM_THR = 0.06;    // monthly anomaly threshold for timing

// ======================== 2. DATA PREP =============================
function prep(img) {
  var scl = img.select('SCL');
  var good = scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10)).and(scl.neq(11));
  var b = img.select(['B2', 'B4', 'B8', 'B11', 'B12']).updateMask(good).divide(10000);
  var nir = b.select('B8'), red = b.select('B4');
  var ndvi = b.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var savi = b.expression('1.5 * (N - R) / (N + R + 0.5)', {N: nir, R: red}).rename('SAVI');
  var msavi = b.expression(
    '(2*N + 1 - sqrt((2*N + 1)*(2*N + 1) - 8*(N - R))) / 2', {N: nir, R: red}).rename('MSAVI2');
  var evi = b.expression('2.5 * (N - R) / (N + 6*R - 7.5*B + 1)',
    {N: nir, R: red, B: b.select('B2')}).rename('EVI');
  return ee.Image.cat([ndvi, savi, msavi, evi])
    .copyProperties(img, ['system:time_start']);
}

var S2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(AOI)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
  .map(prep);

function dryComposite(year, idx) {
  var start = ee.Date.fromYMD(year, DRY_START_MD[0], DRY_START_MD[1]);
  var end = ee.Date.fromYMD(year, DRY_END_MD[0], DRY_END_MD[1]).advance(1, 'day');
  return S2.filterDate(start, end).select(idx).median().rename(idx);
}

// Land cover (2020): tree cover 10, shrubland 20, cropland 40. Olives fall in these.
var wc = ee.ImageCollection('ESA/WorldCover/v100').first().select('Map');
var lcMask = wc.eq(10).or(wc.eq(20)).or(wc.eq(40));

// ===================== 3. CHANGE DETECTION =========================
function analyse(idx) {
  var base = ee.ImageCollection(BASE_YEARS.map(function (y) { return dryComposite(y, idx); }));
  var bMean = base.mean();
  var bStd = base.reduce(ee.Reducer.stdDev()).max(0.02); // floor avoids divide-by-~0
  var post = dryComposite(POST_YEAR, idx);
  var delta = post.subtract(bMean).rename('delta');
  var z = delta.divide(bStd).rename('z');

  var grove = bMean.gte(BASE_MIN[idx]).and(bStd.lte(STD_MAX)).and(lcMask).selfMask();
  var loss = delta.lt(-DELTA_MIN).and(z.lt(-Z_THR)).and(grove).selfMask();
  var lossClean = loss.connectedPixelCount(10, true).gte(MIN_PX).selfMask().rename('loss');
  return {grove: grove, delta: delta, z: z, lossClean: lossClean, post: post, bMean: bMean};
}

var main = analyse(INDEX);

// ========================= 4. AREAS (ha) ===========================
var ha = ee.Image.pixelArea().divide(10000);
function siteAreas(res) {
  return ee.Image.cat([
    res.lossClean.unmask(0).rename('loss_ha'),
    res.grove.unmask(0).rename('grove_ha')
  ]).multiply(ha).reduceRegions({
    collection: SITES, reducer: ee.Reducer.sum(), scale: 10
  }).map(function (f) {
    var loss = ee.Number(f.get('loss_ha')), grove = ee.Number(f.get('grove_ha'));
    return f.set('loss_pct', loss.divide(grove.max(0.01)).multiply(100)).setGeometry(null);
  });
}
print('Loss area per site (' + INDEX + ')', siteAreas(main));

// Index comparison: total loss / grove area per index
COMPARE.forEach(function (idx) {
  var r = analyse(idx);
  var tot = ee.Image.cat([r.lossClean.unmask(0).rename('loss_ha'),
                          r.grove.unmask(0).rename('grove_ha')])
    .multiply(ha).reduceRegion({reducer: ee.Reducer.sum(), geometry: AOI, scale: 10, maxPixels: 1e9});
  print('Totals, ' + idx, tot);
});

// Extend the timing analysis

 // ========== 5. TIMING OF LOSS (2023-2026) ==========

function baselineMonth(m, idx) {
  return S2
    .filter(ee.Filter.calendarRange(
      BASE_YEARS[0],
      BASE_YEARS[BASE_YEARS.length - 1],
      'year'
    ))
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .select(idx)
    .median();
}

function monthComposite(year, m, idx) {
  var s = ee.Date.fromYMD(year, m, 1);

  return S2
    .filterDate(s, s.advance(1, 'month'))
    .select(idx)
    .median();
}

// Investigate anomalies from Jan 2023 to Oct 2026
var START_ANOM = ee.Date('2023-01-01');
var END_ANOM = ee.Date('2026-11-01');

var NMONTHS = END_ANOM.difference(START_ANOM, 'month');

// Monthly anomalies relative to 2020-2022
var anomList = ee.List.sequence(
  0, NMONTHS.subtract(1)
).map(function(i) {

  i = ee.Number(i);
  var date = START_ANOM.advance(i, 'month');

  var year = ee.Number(date.get('year'));
  var month = ee.Number(date.get('month'));

  return monthComposite(year, month, INDEX)
    .subtract(baselineMonth(month, INDEX))
    .rename('anomaly');
});

// First of two consecutive months with negative anomalies
var firstLossMonth = ee.ImageCollection.fromImages(
  ee.List.sequence(0, NMONTHS.subtract(2))
    .map(function(i) {

      i = ee.Number(i);

      var a = ee.Image(anomList.get(i));
      var b = ee.Image(anomList.get(i.add(1)));

      var persist = a.lt(-ANOM_THR)
        .and(b.lt(-ANOM_THR));

      var date = START_ANOM.advance(i, 'month');

      // Store date as YYYYMM, e.g. 202405
      var yearMonth = ee.Number(date.get('year'))
        .multiply(100)
        .add(date.get('month'));

      return ee.Image.constant(yearMonth)
        .toInt32()
        .updateMask(persist)
        .rename('month');
    })
).min().updateMask(main.lossClean);

// Area grouped by first anomaly month
var byMonth = ha.rename('ha')
  .addBands(firstLossMonth)
  .updateMask(firstLossMonth.mask())
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'month'
    }),
    geometry: AOI,
    scale: 10,
    maxPixels: 1e9
  });

print('Potential loss by first anomaly month (YYYYMM)', byMonth);


// Extend time series graph

// ========== 6. TIME SERIES (2020-2026) ==========

// Jan 2020 through Oct 2026 = 82 months
var ts = ee.ImageCollection(
  ee.List.sequence(0, 81).map(function(i) {

    var s = ee.Date('2020-01-01')
      .advance(ee.Number(i), 'month');

    return S2
      .filterDate(s, s.advance(1, 'month'))
      .select(INDEX)
      .median()
      .updateMask(main.grove)
      .set('system:time_start', s.millis());

  })
);

print(
  ui.Chart.image.seriesByRegion(
    ts,
    SITES,
    ee.Reducer.mean(),
    INDEX,
    20,
    'system:time_start',
    'name'
  ).setOptions({
    title: 'Monthly mean ' + INDEX + ' (2020-2026)',
    hAxis: {title: 'Year'},
    vAxis: {title: INDEX},
    lineWidth: 1.5,
    pointSize: 0
  })
);


// ========================= 7. MAP LAYERS ===========================
Map.centerObject(AOI, 9);
Map.setOptions('SATELLITE');
var rgbVis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3};
function dryRGB(year) {
  var s = ee.Date.fromYMD(year, 6, 1), e = ee.Date.fromYMD(year, 9, 30);
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterBounds(AOI)
    .filterDate(s, e).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .select(['B2', 'B3', 'B4']).median().divide(10000).clip(AOI);
}
Map.addLayer(dryRGB(2020), rgbVis,
  'RGB dry 2020 (before)', false);

Map.addLayer(dryRGB(2026), rgbVis,
  'RGB dry 2026 (after)', false);
Map.addLayer(main.grove.clip(AOI), {palette: ['00aa00']}, 'Baseline grove mask', true, 0.4);
Map.addLayer(main.delta.updateMask(main.grove).clip(AOI),
  {min: -0.2, max: 0.1, palette: ['d7191c', 'ffffbf', '1a9641']}, 'Delta ' + INDEX, false);
Map.addLayer(main.lossClean.clip(AOI), {palette: ['ff0000']}, 'Detected loss', true);
Map.addLayer(
  firstLossMonth.divide(100).floor().clip(AOI),
  {
    min: 2023,
    max: 2026,
    palette: ['440154', '31688e', '35b779', 'fde725']
  },
  'First persistent anomaly year (2023-2026)',
  false
);
Map.addLayer(SITES.style({color: 'ffffff', fillColor: '00000000'}), {}, 'Study sites');



// =======================================================
// 8. EXPORT - HEBRON VEGETATION CHANGE (2020-2026)
// =======================================================

// All raster exports use the same projection and resolution
var exportCRS = 'EPSG:32636';  // UTM Zone 36N
var exportScale = 10;
var exportFolder = 'GEE_Hebron';


// =======================================================
// 8.1 SENTINEL-2 RGB COMPOSITES
// =======================================================

// Prepare cloud-masked Sentinel-2 imagery
function prepareRGB(img) {

  var scl = img.select('SCL');

  // Exclude defective pixels, cloud shadows,
// medium/high clouds, cirrus and snow
  var good = scl.neq(1)
    .and(scl.neq(3))
    .and(scl.neq(8))
    .and(scl.neq(9))
    .and(scl.neq(10))
    .and(scl.neq(11));

  return img
    .updateMask(good)
    .select(['B4', 'B3', 'B2'])
    .divide(10000);
}

// Create June-September median composite
function exportRGBComposite(year) {

  var start = ee.Date.fromYMD(year, 6, 1);
  var end = ee.Date.fromYMD(year, 10, 1);

  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(AOI)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
    .map(prepareRGB)
    .median()
    .clip(AOI);
}

// Prepare the two comparison images
var rgb2020 = exportRGBComposite(2020);
var rgb2026 = exportRGBComposite(2026);

// RGB visualisation for QGIS and PowerPoint
var rgbExportVis = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.3,
  gamma: 1.15
};

// EXPORT 1: Sentinel-2 RGB 2020
Export.image.toDrive({
  image: rgb2020.visualize(rgbExportVis),
  description: 'Hebron_Sentinel2_RGB_2020',
  folder: exportFolder,
  region: AOI,
  scale: exportScale,
  crs: exportCRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

// EXPORT 2: Sentinel-2 RGB 2026
Export.image.toDrive({
  image: rgb2026.visualize(rgbExportVis),
  description: 'Hebron_Sentinel2_RGB_2026',
  folder: exportFolder,
  region: AOI,
  scale: exportScale,
  crs: exportCRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});


// =======================================================
// 8.2 BASELINE VEGETATION MASK
// =======================================================

// 1 = vegetation meeting baseline criteria
// 0 = other pixels, including areas without valid data

var baselineRaster = main.grove
  .unmask(0)
  .toByte()
  .rename('baseline_vegetation')
  .clip(AOI);

// EXPORT 3: Baseline vegetation
Export.image.toDrive({
  image: baselineRaster,
  description: 'Hebron_Vegetation_Baseline_2020_2022',
  folder: exportFolder,
  region: AOI,
  scale: exportScale,
  crs: exportCRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});


// =======================================================
// 8.3 DETECTED VEGETATION LOSS
// =======================================================

// 1 = potential vegetation loss
// 0 = no detected loss or insufficient valid data

var lossRaster = main.lossClean
  .unmask(0)
  .toByte()
  .rename('potential_loss')
  .clip(AOI);

// EXPORT 4: Potential vegetation loss
Export.image.toDrive({
  image: lossRaster,
  description: 'Hebron_Vegetation_Loss_2020_2026',
  folder: exportFolder,
  region: AOI,
  scale: exportScale,
  crs: exportCRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});


// =======================================================
// 8.4 MSAVI2 CHANGE RASTER
// =======================================================

// Difference between 2026 and baseline mean
// Negative values = declining vegetation greenness
// Positive values = increasing vegetation greenness

var deltaRaster = main.delta
  .toFloat()
  .rename('MSAVI2_change')
  .clip(AOI);

// EXPORT 5: MSAVI2 difference
Export.image.toDrive({
  image: deltaRaster,
  description: 'Hebron_MSAVI2_Change_2020_2026',
  folder: exportFolder,
  region: AOI,
  scale: exportScale,
  crs: exportCRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});


// =======================================================
// 8.5 AOI BOUNDARY
// =======================================================

// EXPORT 6: Hebron study area polygon
Export.table.toDrive({
  collection: SITES,
  description: 'Hebron_AOI_Boundary',
  folder: exportFolder,
  fileFormat: 'GeoJSON'
});


// =======================================================
// 8.6 VEGETATION LOSS STATISTICS
// =======================================================

// Calculate areas using the existing function
var areaStats = siteAreas(main);

// EXPORT 7: Area statistics as CSV
Export.table.toDrive({
  collection: areaStats,
  description: 'Hebron_Vegetation_Loss_Statistics',
  folder: exportFolder,
  fileFormat: 'CSV'
});

print('Seven export tasks created. Open the Tasks tab.');

  
/* CALIBRATION (do this before trusting any number)
 *  - Turn on 'RGB dry 2025' / 'RGB dry 2026' and the Delta layer; use the Inspector on
 *    groves you know are intact and on cleared sites (e.g. Zububa near the barrier).
 *  - Adjust BASE_MIN so intact groves are inside the green mask and bare soil is not.
 *  - Adjust DELTA_MIN / Z_THR until known-cleared plots are red and intact ones are not.
 *  - Validate against very high-resolution imagery (Google/Esri basemap, Planet) for a
 *    random sample of detected polygons and of non-detected ones; report precision/recall.
 *  - Sentinel-2 is 10 m: individual trees are not resolved. You detect cleared blocks
 *    (roughly 0.05 ha and up), not tree counts. Converting area to tree numbers needs
 *    a local planting density assumption.
 *  - Loss can also be caused by construction, fire, ploughing or drought. Check the
 *    SWIR indices (NBR, NDMI) and imagery to separate burned/cleared land.
 */
