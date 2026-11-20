# Hebron: Potential vegetation change (2020–2026)

**Status:** **Method summary supplied only; full executable GEE JavaScript is still needed.** Processing statements below reproduce the supplied method description; exact implementation details cannot yet be checked.

## Objective

Identify **potential vegetation decline** between the 2020–2022 baseline and 2026 from Sentinel-2 data. Detected loss is **not** independently validated and must **not** be described as confirmed removal of vegetation or olive groves.

## Input datasets

- Sentinel-2 Level-2A surface reflectance, nominal output resolution **10 m** (the exact Earth Engine collection ID is **not confirmed by the supplied excerpt**; `COPERNICUS/S2_SR_HARMONIZED` is a current catalog reference to verify against the complete script).
- ESA WorldCover **2020** land-cover map, 10 m; trees, shrubs and cropland classes used as the vegetation candidate mask.
- Hebron AOI; the complete script must confirm which asset/path is used.

## Processing summary provided by the project

1. Apply Sentinel-2 scene-classification (SCL)-based cloud masking; specific excluded SCL values are **not provided in the excerpt**.
2. Create yearly dry-season composites for **June–September**.
3. Calculate vegetation indices; **MSAVI2** is the primary index.
4. Obtain the 2020–2022 reference-period **mean and standard deviation**.
5. Restrict detections to baseline vegetation using WorldCover 2020 tree/shrub/cropland classes plus thresholds: **baseline mean MSAVI2 ≥ 0.14** and **baseline SD ≤ 0.06**.
6. Flag potential decline in 2026 with **MSAVI2 difference < −0.05** and **z-score < −2.5**. Use the reported **0.02 standard-deviation floor** in the z-score calculation.
7. Remove isolated detections of **fewer than 5 connected pixels**.
8. Export results for assessment and visualization in ArcGIS Pro, using the reported **10 m** output resolution and **EPSG:32636**.

## Parameter summary

| Parameter | Reported value |
| --- | --- |
| Baseline | 2020, 2021, 2022 |
| Comparison | 2026 |
| Seasonal window | June–September |
| Primary index | MSAVI2 |
| Baseline mean MSAVI2 | ≥ 0.14 |
| Baseline MSAVI2 SD | ≤ 0.06 |
| MSAVI2 change | < −0.05 |
| Z-score | < −2.5 |
| SD floor | 0.02 |
| Minimum connected pixels | 5 |
| Nominal output resolution | 10 m |
| Export CRS | EPSG:32636 |

## Implementation details to verify from the full JavaScript

- Exact Sentinel-2 collection ID and bands used (and reflectance scaling).
- SCL class exclusions, shadow treatment and minimum seasonal observation count.
- How per-year composite MSAVI2 is calculated; whether index values are averaged before or after band compositing.
- Whether baseline SD is computed across annual composites or individual acquisitions.
- Which WorldCover 2020 class codes are included and whether they are expanded/restricted by other land-cover masks.
- Z-score formula and how the 0.02 SD floor is applied.
- Connectedness definition, masking, exported layers and export filenames.
- Date coverage actually available for 2026 and data gaps.

## Limitations and interpretation

- A lower dry-season vegetation index can result from vegetation decline **or** other drivers, such as moisture stress, agricultural management, phenology, and observation artefacts.
- Sentinel-2 at 10 m has mixed pixels and may not distinguish individual olive trees from other vegetation reliably.
- WorldCover 2020 is a historical land-cover mask and may miss vegetation present after 2020.
- Using both a fixed negative change threshold and a strong negative z-score is conservative, but can omit subtle losses and cannot by itself establish change causality.
- **No independent accuracy assessment has yet been documented in the supplied method summary.**

## Authoritative sources

- [Sentinel-2 L2A harmonized — Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
- [ESA WorldCover 2020 — Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/ESA_WorldCover_v100)

**Next action:** Add the full vegetation `.js` file, then update this document to match the implementation exactly.
