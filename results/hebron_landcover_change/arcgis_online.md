# Interactive Map — Hebron Land-Cover Change

## Open the map

[View the ArcGIS Experience](https://experience.arcgis.com/experience/b3d5ab018e5e46ba85facca4bc0b9f58)

**Platform:** ArcGIS Experience (ArcGIS Online)

**Study area:** Hebron, West Bank, Palestine  
**Analysis periods:** June–September 2020, 2021, and 2022 (baseline), compared with June–September 2026  
**Nominal analysis resolution:** 10 m  
**Export coordinate reference system:** EPSG:32636 (WGS 84 / UTM zone 36N)

## Analyses represented

This interactive presentation is associated with two Google Earth Engine workflows:

1. **Potential vegetation decline:** Sentinel-2 Level-2A surface reflectance, SCL cloud masking, MSAVI2, and an ESA WorldCover 2020 mask for selected vegetation classes. Candidate changes are identified using baseline MSAVI2 mean and standard deviation and negative 2026 change thresholds.
2. **Potential built-up change:** Dynamic World V1 `built` probabilities. The analysis compares mean dry-season probabilities between baseline and 2026, identifies low-to-high and high-to-low transitions, and removes groups smaller than five connected pixels.

See the repository's `code/gee/` and `docs/methodology/` for the processing code and detailed parameters. This page describes the analysis linked to the presentation; verify which outputs are actually visible in the published map before treating this as an exhaustive layer inventory.

## Results and interpretation

The map is an interactive visualization of the regional analysis. Quantitative results, mapped patterns, and layer-specific descriptions should be added here after examining the published map and exported results.

**Status:** Descriptive interpretation and independent validation pending.

## Limitations

- These outputs identify *potential* changes; they do not independently confirm vegetation removal, new construction, or demolition.
- Vegetation signals may also respond to seasonal or interannual environmental differences.
- Dynamic World class probabilities have uncertainty, particularly near class boundaries and in mixed pixels.
- The analyses have not yet been independently validated.
- Public access to the Experience depends on its sharing settings and on access to all its referenced web maps and layers.

## Reproducibility

The ArcGIS Experience presents results; it is not itself an executable processing workflow. See the Earth Engine scripts and the methodology documentation for the steps used to generate the underlying layers. Large raster datasets and ArcGIS Pro project dependencies may need separate storage or download instructions.
