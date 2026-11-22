# Methodology — Hebron Vegetation Change Detection (2020–2026)

## Objective

Identify potential vegetation decline in the Hebron study area by comparing a **2020–2022 baseline** with 2026 using Sentinel-2 imagery and vegetation indices.

## 1. Data and Preprocessing

- **Sentinel-2 Level-2A:** Surface reflectance imagery at 10 m nominal output resolution.
- **ESA WorldCover 2020:** Vegetation mask including trees, shrubs, and cropland.
- **Study area:** Hebron, West Bank.

Sentinel-2 imagery was cloud-masked using the Scene Classification Layer (SCL). Annual dry-season composites (June–September) were generated to reduce seasonal variability.

## 2. Vegetation Change Detection

The **Modified Soil-Adjusted Vegetation Index (MSAVI2)** was used to assess vegetation conditions.

Mean and standard deviation of MSAVI2 were calculated for the 2020–2022 baseline. Potential vegetation loss was identified using the following thresholds:

| Parameter | Threshold |
|---|---|
| Baseline mean MSAVI2 | ≥ 0.14 |
| Baseline standard deviation | ≤ 0.06 |
| MSAVI2 change (2026 − baseline) | < −0.05 |
| Z-score | < −2.5 |
| Standard deviation floor | 0.02 |
| Minimum connected pixels | 5 |

Detected changes were filtered to remove isolated pixels and exported at **10 m resolution (EPSG:32636)** for visualisation and spatial analysis in ArcGIS Pro.

## 3. Limitations

The detected changes represent **potential vegetation decline**, not independently confirmed vegetation removal or olive grove loss.

Vegetation indices may be influenced by moisture stress, agricultural practices, seasonal variability, cloud/shadow contamination, and mixed pixels. The ESA WorldCover 2020 mask may also exclude vegetation established after 2020.

No independent accuracy assessment has been conducted.

## Sources and Reproducibility

- [Sentinel-2 L2A — Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
- [ESA WorldCover 2020 — Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/ESA_WorldCover_v100)
- Processing script: `code/gee/`
- Results: `results/hebron_landcover_change/`
