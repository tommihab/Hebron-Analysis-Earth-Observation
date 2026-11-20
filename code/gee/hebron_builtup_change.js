// ========================================================
// BUILT-UP AREA CHANGE DETECTION - HEBRON (2020-2026)
// Google Earth Engine - JavaScript
//
// Method: Dynamic World built-up probabilities
// Baseline: June-September 2020, 2021, 2022
// Comparison: June-September 2026
// Resolution: 10 m
// ========================================================


// ===================== 1. CONFIG ========================

// Load the original Hebron AOI
var SITES = ee.FeatureCollection(
  'projects/geohum-action/assets/hebron_aoi'
);

var AOI = SITES.geometry();

// Analysis period
var BASE_YEARS = [2020, 2021, 2022];
var POST_YEAR = 2026;

// Probability thresholds (starting values)
var BEFORE_MAX = 0.20;
var AFTER_MIN = 0.50;

// Minimum number of connected pixels
var MIN_PX = 5;

// Export settings
var EXPORT_CRS = 'EPSG:32636';
var EXPORT_SCALE = 10;
var EXPORT_FOLDER = 'GEE_Hebron';


// ===================== 2. DATA ==========================

// Dynamic World land-cover probabilities
var DW = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filterBounds(AOI)
  .select('built');


// ===================== 3. COMPOSITES ====================

// Create dry-season mean probability for one year
function dryBuilt(year) {

  var start = ee.Date.fromYMD(year, 6, 1);
  var end = ee.Date.fromYMD(year, 10, 1);

  return DW
    .filterDate(start, end)
    .mean()
    .rename('built');
}

// Baseline: mean of three annual composites
var baselineCollection = ee.ImageCollection.fromImages(
  BASE_YEARS.map(function(year) {
    return dryBuilt(year);
  })
);

var builtBefore = baselineCollection
  .mean()
  .rename('built_baseline');

// Comparison: 2026
var builtAfter = dryBuilt(POST_YEAR)
  .rename('built_2026');


// ===================== 4. CHANGE DETECTION ==============

// Change in built-up probability
var builtDelta = builtAfter
  .subtract(builtBefore)
  .rename('built_change');

// Areas changing from low to high built probability
var newBuilt = builtBefore.lt(BEFORE_MAX)
  .and(builtAfter.gt(AFTER_MIN))
  .selfMask();

// Remove isolated pixels
var newBuiltClean = newBuilt
  .updateMask(
    newBuilt.connectedPixelCount(100, true)
      .gte(MIN_PX)
  )
  .rename('new_built');

// Valid observations in both periods
var valid = builtBefore.mask()
  .and(builtAfter.mask());
  

// ================= BUILT-UP REDUCTION =================

// Areas changing from high to low built-up probability
var lostBuilt = builtBefore.gt(AFTER_MIN)
  .and(builtAfter.lt(BEFORE_MAX))
  .selfMask();

// Remove isolated pixels (same as expansion)
var lostBuiltClean = lostBuilt
  .updateMask(
    lostBuilt.connectedPixelCount(100, true)
      .gte(MIN_PX)
  )
  .rename('lost_built');



// ===================== 5. MAP ===========================

Map.centerObject(AOI, 10);
Map.setOptions('SATELLITE');

// Built-up areas in reference period
Map.addLayer(
  builtBefore.gte(0.5).selfMask().clip(AOI),
  {palette: ['808080']},
  'Baseline built-up areas (2020-2022)',
  false,
  0.6
);

// Built-up areas in 2026
Map.addLayer(
  builtAfter.gte(0.5).selfMask().clip(AOI),
  {palette: ['ff9900']},
  'Built-up areas 2026',
  false,
  0.6
);

// Continuous change in built-up probability
Map.addLayer(
  builtDelta.clip(AOI),
  {
    min: -0.5,
    max: 0.5,
    palette: ['2166ac', 'ffffff', 'b2182b']
  },
  'Built-up probability change',
  false
);

// Potential new built-up areas
Map.addLayer(
  newBuiltClean.clip(AOI),
  {palette: ['ff0000']},
  'Potential built-up expansion',
  true
);


// Potential reduction in built-up areas
Map.addLayer(
  lostBuiltClean.clip(AOI),
  {palette: ['0000FF']},
  'Potential built-up reduction',
  true
);

// AOI boundary
Map.addLayer(
  SITES.style({
    color: 'ffffff',
    fillColor: '00000000',
    width: 2
  }),
  {},
  'Hebron AOI'
);


// ===================== 6. EXPORT ========================

// 1 = potential new built-up area
// 0 = no detected expansion
// Missing observations remain masked

var expansionRaster = newBuiltClean
  .unmask(0)
  .updateMask(valid)
  .toByte()
  .clip(AOI);

// Export potential built-up expansion
Export.image.toDrive({
  image: expansionRaster,
  description: 'Hebron_BuiltUp_Expansion_2020_2026',
  folder: EXPORT_FOLDER,
  region: AOI,
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

// Export baseline built-up probability
Export.image.toDrive({
  image: builtBefore.toFloat().clip(AOI),
  description: 'Hebron_BuiltUp_Probability_Baseline',
  folder: EXPORT_FOLDER,
  region: AOI,
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

// Export built-up probability in 2026
Export.image.toDrive({
  image: builtAfter.toFloat().clip(AOI),
  description: 'Hebron_BuiltUp_Probability_2026',
  folder: EXPORT_FOLDER,
  region: AOI,
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

// Export change in built-up probability
Export.image.toDrive({
  image: builtDelta.toFloat().clip(AOI),
  description: 'Hebron_BuiltUp_Probability_Change',
  folder: EXPORT_FOLDER,
  region: AOI,
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});

print('Built-up analysis ready. Check map and Tasks tab.');


// ================= EXPORT BUILT-UP REDUCTION =================

// 1 = potential built-up reduction
// 0 = no detected reduction
// Missing observations remain masked

var reductionRaster = lostBuiltClean
  .unmask(0)
  .updateMask(valid)
  .toByte()
  .clip(AOI);

Export.image.toDrive({
  image: reductionRaster,
  description: 'Hebron_BuiltUp_Reduction_2020_2026',
  folder: EXPORT_FOLDER,
  region: AOI,
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e10,
  fileFormat: 'GeoTIFF'
});
