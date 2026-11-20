# Results and interpretation: Hebron land-cover change

## Scope

This section interprets the combined regional vegetation and built-up change map for the Hebron study area. Both workflows use dry-season observations (June–September), comparing a 2020–2022 baseline with 2026. The analyses are indicative, not independently validated ground-truth change inventories.

## Results

The final map reports **457.23 ha of potential vegetation loss**, corresponding to **4.96% of baseline vegetation**. Potential built-up expansion totals **418.91 ha**, or **2.71% of baseline built-up area**, while potential built-up reduction is **7.47 ha**, or **0.05% of baseline built-up area**. These area and percentage figures were read from the final map and have not been independently recalculated. A supplementary summary table further reports **11.89 ha** as the **overlap between potential vegetation loss and potential built-up expansion**, corresponding to **2.60% of mapped vegetation loss** and **2.84% of mapped built-up expansion**. This is an intersection of the reported change categories, **not a fourth independent land-cover change area**; do not add it to the individual area figures.

The map indicates spatially scattered patches of change. Potential built-up expansion occurs in clusters in several parts of the AOI, including northern and central areas, rather than forming a single continuous expansion zone. Potential vegetation decline likewise appears as localized, dispersed patches. Potential built-up reduction is much less extensive visually and numerically than expansion.

## Interpretation

The two methods provide complementary indications of land-cover dynamics. MSAVI2 highlights places whose dry-season vegetation signal declined beyond chosen thresholds; Dynamic World `built` probability identifies pixels with substantial shifts in modelled built-up likelihood. Their combined visualisation allows potential landscape changes to be compared spatially, but **does not prove that new buildings replaced vegetation**. The supplementary overlap result indicates that the two detection classes coincide over a small portion of their mapped areas, but this does not on its own confirm conversion from vegetation to built-up land. Demonstrating such a transition would require verification of how the overlap was calculated, aligned raster masks, visual checks against date-matched high-resolution imagery, and preferably independent validation data.

The 2020–2022 reference is a multi-year baseline, not a single observed land-cover map for 2020. The comparison captures the contrast between average baseline conditions and 2026, not the timing or persistence of every change over the intervening years.

## Method-specific uncertainty

**Vegetation.** Sentinel-2 Level-2A was cloud-masked using scene classification. Annual dry-season composites and MSAVI2 were used with a vegetation baseline mask incorporating ESA WorldCover 2020. The supplied parameters were: mean MSAVI2 ≥ 0.14; baseline standard deviation ≤ 0.06; 2026-minus-baseline MSAVI2 < −0.05; z-score < −2.5 using a standard-deviation floor of 0.02; and ≥ 5 connected pixels. Changes may also reflect rainfall, agricultural management, phenology, canopy stress, residual clouds/shadows, and imperfect land-cover masking. The result cannot identify olive groves specifically or establish why vegetation signals declined.

**Built-up.** Dynamic World V1 annual mean June–September `built` probability images were averaged for 2020–2022 and compared with 2026. Expansion was flagged where baseline probability < 0.20 and 2026 probability > 0.50; reduction used the reverse transition. Both required ≥ 5 connected pixels. The `built` probability is not equivalent to a validated building footprint or cadastral built area. Dry bare ground, bright surfaces, mixed pixels, changes in image conditions and classifier performance can cause false detections. The results represent candidate changes rather than confirmed building construction or demolition.

**Cross-method comparison.** The vegetation and built-up outputs derive from different inputs and algorithms. Their reported change areas are **not mutually exclusive**: 11.89 ha was reported in both the vegetation-loss and built-up-expansion categories. The overlap represents 11.89 / 457.23 = **2.60%** of vegetation loss and 11.89 / 418.91 = **2.84%** of built-up expansion (rounded to two decimals). The headline change percentages have different denominators (baseline vegetation versus baseline built-up area); none of these percentages should be added or mistaken for a share of the total AOI. Spatial coincidence alone does not establish cause.

## Suggested validation before scientific publication

1. Independently recalculate change areas from exported GeoTIFF masks using valid-observation masks and verify each denominator.
2. Inspect a geographically stratified sample of detected-change and no-change sites in high-resolution imagery for baseline and 2026, where imagery exists.
3. Produce confusion matrices / precision and recall estimates for each change type if sufficient reference samples are available.
4. Test sensitivity to cloud masking, MSAVI2 thresholds, Dynamic World probability thresholds, and minimum patch size.
5. Reproduce and inspect the reported **11.89 ha** spatial intersection using the original change rasters on a common aligned 10 m grid. Confirm the valid-observation masks and overlap counting procedure; then check overlapping and non-overlapping detections against independent imagery before suggesting a relationship between the two.

## Potential narrative for the report or StoryMap

The combined regional map identifies candidate vegetation and built-up changes across the Hebron AOI. A local very-high-resolution orthophoto case study can then illustrate what finer imagery reveals about individual structures and vegetation features, while demonstrating where 10 m remote sensing is too coarse to support definitive conclusions.

## Sources and provenance

- Results map: `results/hebron_landcover_change/maps/Hebron_LandCover_Change_2026.png`.
- Supplied overlap summary screenshot: `results/hebron_landcover_change/statistics/overlap_summary_source.png`.
- Regional GEE scripts: `code/gee/`.
- Detailed methodologies: `docs/methodology/`.
- Interactive result: https://experience.arcgis.com/experience/b3d5ab018e5e46ba85facca4bc0b9f58
