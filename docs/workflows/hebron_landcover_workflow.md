# Regional land-cover change workflow — Hebron

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
