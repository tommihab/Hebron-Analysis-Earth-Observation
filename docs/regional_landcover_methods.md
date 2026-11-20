# Regional vegetation and built-up land-cover change: Methods

> **Status: working draft.** The final methodology must be checked against `code/gee/vegetation_builtup_change.js`. Historical project notes differ on whether the baseline covers **2020–2022** or **2020–2023**. Do not publish a fixed baseline period until the actual code has been inspected.

## Study area

Hebron study area, West Bank, Palestine. The AOI was previously handled in WGS 84 / UTM zone 36N (EPSG:32636). Confirm geometry, extent, CRS, and export projection from the working script and AOI dataset.

## Vegetation change analysis

- Source imagery: Sentinel-2 Harmonized Level-2A surface reflectance (`COPERNICUS/S2_SR_HARMONIZED`).
- Seasonal focus: June–September for each study year, intended to reduce seasonal inconsistencies. Verify dates in the JavaScript.
- Cloud and shadow screening: prior workflow notes indicate Sentinel-2 Scene Classification Layer (SCL) exclusion of categories `0, 1, 3, 8, 9, 10, 11`. Verify the implementation.
- Vegetation index: Modified Soil Adjusted Vegetation Index (MSAVI2), derived from red and near-infrared reflectance.
- Seasonal aggregation: median per year, then a cross-year baseline mean and standard deviation, according to prior workflow notes. Confirm with the actual code.
- Baseline vegetation mask: ESA WorldCover 2020 (`ESA/WorldCover/v100`), reported classes `10` tree cover, `20` shrubland, and `40` cropland. WorldCover is a *static 2020 reference*, not the change-detection time series.
- **Previously discussed candidate thresholds (not yet verified against code):** baseline MSAVI2 >= 0.14; baseline SD <= 0.06; MSAVI2 decline < -0.05; z-score < -2.5 with SD floor 0.02; minimum patch >= 5 connected 10-m pixels.
- Validation: `TO_ADD` (reference samples, sample strategy, confusion assessment, uncertainty).

## Built-up change analysis

- Source: Dynamic World V1 (`GOOGLE/DYNAMICWORLD/V1`), using its `built` probability band.
- Seasonal aggregation: June–September; mean composite per year and mean baseline across selected years, according to prior notes. Verify in code.
- **Previously discussed candidate thresholds (not yet verified):** identify potential built-up expansion where baseline built probability < 0.20 and comparison built probability > 0.50.
- Interpretation: a rise in built probability is *potential built-up change*, not confirmed building construction. Manual validation with higher-resolution imagery is needed.
- Minimum mapping unit and other post-processing: `TO_VERIFY`
- Validation: `TO_ADD`

## Export and reproducibility

Document output names, date exported, exact spatial grid, export CRS, resolution/scale, code commit, and relevant Earth Engine asset dependencies for each map or table.

## Open decisions

- Confirm baseline years (`2020–2022` vs `2020–2023`) from the JavaScript.
- Confirm whether the comparison period uses the full June–September 2026 season.
- Confirm all thresholds, cloud mask, aggregation functions, connected-pixel minimum and area statistics.
- Add calculated results and independent validation; do not infer any change magnitude before reviewing the exports.
