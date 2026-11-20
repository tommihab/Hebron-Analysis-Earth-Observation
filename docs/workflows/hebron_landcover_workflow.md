# Regional land-cover change workflow — Hebron

The project uses two **distinct** workflows to investigate change in the same broad study area. Their outputs should be compared as complementary indicators, not combined into a single validated land-cover change product without additional assessment.

## A. Built-up probability change (executable script provided)

1. Data acquisition and processing
- Definition AOI
- Use of Sentinel-2 L2A, Dynamic World V1 and ESA WorldCover 2020 in Google Earth Engine.
- Cloud masking and generation of seasonal composites (June–September).
- Comparison of the 2020–2022 baseline with 2026/2025-2026
2. Vegetation and loss detection
- Calculation of Modified Soil-Adjusted Vegetation Index (MSAVI2). 
- Identification of stable vegetation
- Identification of vegetation loss
3. Built up area change detection
- Calculation of mean Dynamic World built up probabilities
- Threshold based change detection:
→ Expansion: increase from <20% to >50%
4. Spatial and statistical analysis
- Calculation of absolute and relative area change
- Classification of vegetation change
5. Geovisualisation
- Creation of static Map in ArcGIS Pro
- Development of interactive Swipe map in ArcGIS online
- Creation of static Classification Map in QGIS


## How to link the two analyses

Use a common AOI and describe the different data origins, temporal sampling, masks and thresholds. Compare maps qualitatively, examine coincidence of potential vegetation decline and potential built-up expansion, and verify candidate examples in higher-resolution reference imagery. Co-occurrence does **not** establish that one change caused the other.

## Before reporting quantified findings

1. Add actual export files and screenshots with dates and legend descriptions.
2. Record script version, export parameters and Earth Engine run date.
3. Calculate areas only over valid and clearly documented masks / pixel grids.
4. Review sample detections against appropriate independent reference data.
5. Report uncertainty and false positives; avoid presenting unvalidated candidate pixels as confirmed building or vegetation losses.
