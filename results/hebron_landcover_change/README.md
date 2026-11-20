# Hebron regional land-cover change — combined results

![Potential vegetation and built-up area change in Hebron](maps/Hebron_LandCover_Change_2026.png)

**Study area:** Hebron area of interest (AOI), West Bank, Palestine  
**Comparison:** June–September 2020–2022 baseline versus June–September 2026  
**Analysis resolution:** 10 m  
**Status:** Preliminary, threshold-based detections; not independently validated

## Key results

| Detected change | Mapped area | Percentage reported on map | Interpretation |
|---|---:|---:|---|
| Potential vegetation loss | **457.23 ha** | **4.96%** of baseline vegetation | Areas meeting the vegetation-decline criteria |
| Potential built-up expansion | **418.91 ha** | **2.71%** of baseline built-up area | Areas changing from low to high Dynamic World built probability |
| Potential built-up reduction | **7.47 ha** | **0.05%** of baseline built-up area | Areas changing from high to low Dynamic World built probability |
| **Overlap of potential vegetation loss and built-up expansion** | **11.89 ha** | **2.60% of detected vegetation loss**; **2.84% of detected built-up expansion** | Area identified in both change categories (not additional area) |

*The first three values are transcribed from the final map; the 11.89 ha overlap and its percentages are transcribed from a supplementary summary-table screenshot. They have not been independently recalculated from the original GeoTIFFs. Overlap is part of both reported change areas and must **not** be added to their totals. The denominator definitions, area calculations and intersection method should be verified before publication.*

## Map interpretation

Potential built-up expansion appears in scattered clusters, including northern and central portions of the AOI. Potential vegetation loss is also spatially dispersed, with localized mapped patches. The mapped extent of potential built-up reduction is substantially smaller than that of expansion. The supplementary table reports **11.89 ha** where the two potential change detections overlap. That represents **2.60%** of the detected vegetation-loss area and **2.84%** of detected built-up expansion. The limited spatial overlap does **not** establish that vegetation loss was caused by new construction; co-location is not evidence of causation, and independent high-resolution checks remain necessary.

## Data and methods

- **Vegetation:** Sentinel-2 Level-2A surface reflectance; SCL-based cloud masking; dry-season MSAVI2 composites; ESA WorldCover 2020 tree/shrub/cropland mask; 2020–2022 baseline compared to 2026. See [`docs/methodology/`](../../docs/methodology/) and [`code/gee/`](../../code/gee/).
- **Built-up:** Google Dynamic World V1 `built` probability; mean June–September composites for 2020, 2021 and 2022, compared against 2026. Transition thresholds: baseline `< 0.20` and 2026 `> 0.50` for expansion, reversed for reduction; minimum 5 connected pixels. See [`code/gee/`](../../code/gee/).
- **Map production:** Combined visualisation in ArcGIS Pro and ArcGIS Online.

## Available outputs

- [Static map (PNG)](maps/Hebron_LandCover_Change_2026.png)
- [Summary statistics (CSV)](statistics/hebron_change_summary.csv)
- [Original overlap summary-table screenshot](statistics/overlap_summary_source.png)
- [Detailed findings, interpretation and limitations](../../docs/findings/hebron_landcover_results.md)
- [Results provenance and outstanding verification](../../metadata/hebron_results_provenance.md)
- [Interactive ArcGIS Experience](https://experience.arcgis.com/experience/b3d5ab018e5e46ba85facca4bc0b9f58)

If there is an existing `arcgis_online.md` in this folder, retain it; the above URL can be added there as well.

## Limitations

These are model/threshold detections, not confirmed physical changes. Possible errors include seasonal differences, cloud/shadow residuals, misclassification of bare surfaces as built-up land, mixed 10 m pixels and sensitivity to thresholds. The vegetation signal cannot specifically identify olive-grove removal; built-probability change does not alone confirm construction or demolition. The map is descriptive and does not establish causes or causal relationships between classes. No independent accuracy assessment or ground verification has yet been provided.

## Reproduction and file availability

The map figure and summary statistics are included in GitHub. The input AOI, original Google Earth Engine outputs and ArcGIS Pro project should be made accessible separately, where licensing and file size permit. Ensure other contributors have access to the Earth Engine AOI asset (`projects/geohum-action/assets/hebron_aoi`) or provide an equivalent AOI GeoJSON. Original exports, zonal-statistics procedures, and the calculation method for the spatial overlap are still needed to fully reproduce the mapped areas and percentages.
