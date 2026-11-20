# Regional land-cover change workflow — Hebron

The project uses two **distinct** workflows to investigate change in the same broad study area. Their outputs should be compared as complementary indicators, not combined into a single validated land-cover change product without additional assessment.

## A. Built-up probability change (executable script provided)

```text
Hebron AOI (Earth Engine asset)
          +
Dynamic World V1 'built' probabilities (10 m)
          |
June–September annual means: 2020 / 2021 / 2022 / 2026
          |
Baseline = mean of 2020, 2021 and 2022 annual means
          |
Probability difference = 2026 − baseline
          |
Expansion: baseline < 0.20 AND 2026 > 0.50
Reduction: baseline > 0.50 AND 2026 < 0.20
          |
Keep connected candidate groups ≥ 5 pixels
          |
Export GeoTIFFs: probability baseline, 2026, delta,
                  expansion and reduction
          |
Independent interpretation and validation (PENDING)
```

## B. Vegetation change (method summary provided; script pending)

```text
Hebron AOI + Sentinel-2 L2A + ESA WorldCover 2020
          |
SCL cloud masking
          |
June–September annual composites, 2020–2022 and 2026
          |
MSAVI2; baseline mean and standard deviation
          |
WorldCover vegetation candidate mask + baseline MSAVI2 filters
(mean ≥ 0.14; SD ≤ 0.06)
          |
2026 decline: MSAVI2 delta < −0.05; z-score < −2.5
(SD floor 0.02)
          |
Remove connected groups < 5 pixels
          |
10 m EPSG:32636 output; ArcGIS Pro visualisation
          |
Independent interpretation and validation (PENDING)
```

## How to link the two analyses

Use a common AOI and describe the different data origins, temporal sampling, masks and thresholds. Compare maps qualitatively, examine coincidence of potential vegetation decline and potential built-up expansion, and verify candidate examples in higher-resolution reference imagery. Co-occurrence does **not** establish that one change caused the other.

## Before reporting quantified findings

1. Add actual export files and screenshots with dates and legend descriptions.
2. Record script version, export parameters and Earth Engine run date.
3. Calculate areas only over valid and clearly documented masks / pixel grids.
4. Review sample detections against appropriate independent reference data.
5. Report uncertainty and false positives; avoid presenting unvalidated candidate pixels as confirmed building or vegetation losses.
