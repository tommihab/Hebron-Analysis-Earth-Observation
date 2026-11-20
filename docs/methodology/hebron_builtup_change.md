# Hebron: Potential built-up change (2020–2026)

**Status:** Script supplied; resulting maps and statistics not yet reviewed here; independent validation not documented.

## Objective

Identify locations where the Dynamic World *built* class probability changed substantially between a 2020–2022 reference period and June–September 2026. This is a screening method for **potential** expansion or reduction, not a direct building census or confirmed demolition/construction inventory.

## Inputs and study period

- **Study area:** Geometry from `projects/geohum-action/assets/hebron_aoi` (Google Earth Engine FeatureCollection). The asset must be shared with collaborating users for reruns.
- **Dataset:** Google Dynamic World V1, image collection `GOOGLE/DYNAMICWORLD/V1`, selected band `built` (range 0–1; 10 m nominal resolution). Dynamic World derives classifications from Sentinel-2 L1C imagery; this script does **not** directly load Sentinel-2 L2A data.
- **Reference years:** 2020, 2021, 2022, each from **1 June inclusive to 1 October exclusive**.
- **Comparison year:** 2026, from **1 June inclusive to 1 October exclusive**.

## Processing workflow (as implemented in the supplied script)

1. Filter Dynamic World by the AOI and select the `built` probability band.
2. For each of 2020, 2021, 2022 and 2026, compute a pixelwise **mean of available Dynamic World observations** for June–September.
3. Compute the reference surface as the pixelwise **mean of the three annual mean images**. This weights years equally where all three annual composites have data, rather than pooling all scenes into a single mean.
4. Compute the change surface: `built_change = built_2026 − built_baseline`.
5. Flag **potential expansion** where baseline probability is **strictly < 0.20** and 2026 probability is **strictly > 0.50**.
6. Flag **potential reduction** where baseline probability is **strictly > 0.50** and 2026 probability is **strictly < 0.20**.
7. Retain detections with **at least 5 connected candidate pixels** using `connectedPixelCount(100, true)` (8-connected neighbors). At nominal 10 m resolution, 5 pixels correspond to roughly 500 m² of raster area, not necessarily 500 m² of physical buildings.
8. Construct a valid-data mask from the masks of both probability surfaces. For binary outputs, use value `1` for retained changes and `0` for unflagged valid pixels, keeping invalid observations masked; then clip to the AOI.
9. Display baseline and 2026 probability overlays, continuous probability change, candidate expansion/reduction and the AOI boundary.
10. Export five rasters to Google Drive as GeoTIFFs, CRS `EPSG:32636` and export scale 10 m.

## Exported products

| Export task name | Value / interpretation |
| --- | --- |
| `Hebron_BuiltUp_Expansion_2020_2026` | Byte raster: 1 = candidate expansion, 0 = otherwise where valid |
| `Hebron_BuiltUp_Reduction_2020_2026` | Byte raster: 1 = candidate reduction, 0 = otherwise where valid |
| `Hebron_BuiltUp_Probability_Baseline` | Float: mean 2020–2022 built probability |
| `Hebron_BuiltUp_Probability_2026` | Float: mean 2026 built probability |
| `Hebron_BuiltUp_Probability_Change` | Float: 2026 minus baseline built probability |

The tasks are configured with Drive folder `GEE_Hebron`. **Export tasks must be started manually in the Earth Engine Tasks panel.** These GeoTIFFs are not included in this repository pack.

## Important limitations and QA needs

- `built` is a **model-estimated class probability**, not the measured fraction of a pixel covered by buildings; its difference cannot automatically be interpreted as new built-up area.
- Changes can be influenced by land-cover confusion (e.g., bare soil, rock, shadows, or bright surfaces), acquisition conditions, and the quality of the underlying Dynamic World predictions.
- Cloud/observation masking is inherited from the Dynamic World source. The supplied script does **not** apply a separate Sentinel-2 SCL cloud mask or enforce a minimum image count per pixel; seasonal scene counts and valid-data coverage should be checked.
- The initial probability thresholds (0.20, 0.50) and 5-pixel minimum are **heuristic starting values**, not accuracy-validated cutoffs.
- Binary change detection is stricter than a general increase/decrease in probability: moderate changes will not appear in the binary outputs.
- Retaining 5 connected 10 m pixels excludes small or fragmented changes and does not directly resolve individual small buildings.
- Comparisons cover June–September only: detected differences represent changes in the seasonal probability product, not necessarily changes at an exact construction or removal date.
- The script exports rasters but does **not** compute area summaries, accuracy metrics or independent reference comparisons.

## Reproducibility checklist

- [ ] AOI asset accessible to collaborators, or share a permitted GeoJSON replacement
- [ ] Record date of script execution and number of images per season
- [ ] Archive exported GeoTIFFs or provide a stable location (subject to data licensing)
- [ ] Validate representative candidates using permitted high-resolution imagery
- [ ] Report confirmed/uncertain/false positives, omission examples and class-specific accuracy where possible
- [ ] Test sensitivity to threshold and connected-pixel settings
- [ ] State projection, pixel size, valid-data coverage and area calculation method in result captions

## Authoritative sources

- [Dynamic World V1 — Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1)
- [Dynamic World tutorial: probability-based change exploration](https://developers.google.com/earth-engine/tutorials/community/introduction-to-dynamic-world-pt-3)
