# Regional vegetation and built-up analysis: Workflow

## A. Input data and study region
1. Load the Hebron study-area AOI and record its source, geometry version, and coordinate system.
2. Load Sentinel-2 Harmonized Level-2A, Dynamic World V1, and ESA WorldCover 2020 in Google Earth Engine.
3. Define the actual baseline year range and 2026 comparison interval **exactly as implemented** in the source JavaScript.

## B. Vegetation workflow
1. Filter Sentinel-2 images by AOI and June–September acquisition dates.
2. Mask unusable observations (clouds, cloud shadow, other excluded SCL classes).
3. Compute MSAVI2 from red and NIR reflectance.
4. Calculate seasonal per-year composites and the multi-year baseline summary.
5. Mask candidate vegetated pixels using the 2020 ESA WorldCover classes used in the script.
6. Compare the baseline to 2026 and apply the implemented change thresholds.
7. Clean or filter connected change patches, calculate area statistics, and export results.

## C. Built-up workflow
1. Filter Dynamic World V1 to the AOI and the selected seasonal periods.
2. Select the `built` probability band and aggregate it consistently for each period.
3. Create the baseline and 2026 comparison layers.
4. Apply the probability-change rule implemented in the script.
5. Export candidate built-up change maps and calculate relevant area summaries.

## D. Validation and interpretation
1. Inspect candidate change areas visually using appropriate high-resolution reference data where available.
2. Record reference interpretation dates, sample-selection strategy, and uncertainty.
3. Report the class/probability thresholds and limits of 10 m imagery for isolated small structures.
4. Distinguish *detected vegetation condition change* from demonstrated land-cover conversion, and *built probability change* from confirmed new buildings.
5. Link final map names and figures from `results/vegetation/` and `results/builtup/`.

**Before publication:** Replace this workflow with the exact steps from the final JavaScript. The order above is a documented outline, not an executed provenance log.
