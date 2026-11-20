# Hebron combined result — provenance and verification checklist

## Supplied artifacts

- Final map: `results/hebron_landcover_change/maps/Hebron_LandCover_Change_2026.png` (uploaded by the project team).
- Web map: https://experience.arcgis.com/experience/b3d5ab018e5e46ba85facca4bc0b9f58
- Vegetation, built-up expansion and built-up reduction areas in `results/hebron_landcover_change/statistics/hebron_change_summary.csv` are **transcribed from the final map**.
- Overlap area **11.89 ha** and reported proportions **2.60% of vegetation loss** and **2.84% of built-up expansion** were transcribed from the supplied summary-table screenshot: `results/hebron_landcover_change/statistics/overlap_summary_source.png`. The overlap is included in both change classes and is not additive.

## Workflow lineage

1. AOI: Earth Engine `projects/geohum-action/assets/hebron_aoi` in the supplied built-up script.
2. Vegetation inputs: Sentinel-2 Level-2A, ESA WorldCover 2020; SCL cloud mask and MSAVI2 dry-season composites. Full vegetation JavaScript is maintained in `code/gee/`.
3. Built-up inputs: Google Dynamic World V1, `built` probability; dry-season annual means for 2020–2022 and 2026; two threshold transitions and 5-pixel patch filter.
4. Built-up export settings in supplied script: GeoTIFF, 10 m, EPSG:32636, Google Drive folder `GEE_Hebron`. The script exports expansion, reduction, baseline probability, 2026 probability, and probability delta.
5. Visualisation: ArcGIS Pro and ArcGIS Online. Final map exported as a PNG.

