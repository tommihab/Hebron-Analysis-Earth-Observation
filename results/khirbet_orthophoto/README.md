# Results — Khirbet al-Fakheit building analysis

**Interpretation status:** Preliminary, model-based, **not independently validated**. The submitted notebook does not include exported calculated CSVs or GeoTIFFs. Two final figure cells contain **hard-coded** area estimates, transcribed in the accompanying `statistics/` CSV files. They should be compared with newly calculated outputs before being treated as final.

## Notebook-reported building areas

| Year | Detected building area (m²) |
|---|---:|
| 2021 | 2,845.382 |
| 2022 | 3,097.191 |
| 2023 | 2,888.564 |

Values from the final building-area bar-chart cell. These imply an increase from 2021 to 2022, followed by a decrease in 2023, but an apparent area trend may reflect segmentation sensitivity or spatial misalignment.

## Notebook-reported 2021–2023 spatial change

| Category | Reported area (m²) |
|---|---:|
| Stable building | 1,681.340 |
| Potential building gain | 1,207.227 |
| Potential building loss | 1,164.044 |
| Net change (gain minus loss) | +43.183 |

These numbers come from a **fixed list in the final chart cell**, not directly from the computed `df_change` table in the uploaded notebook. Numerical differences of a few thousandths of a square metre between totals appear to come from the precision used in the fixed numbers. Do not treat them as validation.

## Output manifest in code

- `Building_Probability_{2021,2022,2023}.tif`: predicted per-pixel building probabilities.
- `Building_Mask_{2021,2022,2023}.tif`: binary segmentation masks, chosen threshold 0.30.
- `Building_Change_2021-2022.tif`, `Building_Change_2022-2023.tif`, `Building_Change_2021-2023.tif`: stable background/building, gain/loss categories.
- `Building_Change_Statistics.csv`: dynamically calculated change statistics (not provided with this package).
- `Full_AOI_Building_Segmentation.png`, `Building_Area_Comparison.png`, `Building_Change_Comparison.png`, `Detailed_Building_Change_2021-2023.png` and the two manually specified bar charts.

## Scientific limitations

A 30 cm raster and probability threshold of 0.30 may be useful for exploring building signals, but binary pixel differences can overestimate actual building changes due to co-registration differences, shadows, illumination, seasonal appearance, roof changes, and model prediction errors. No manual reference sample, precision/recall or IoU evaluation is provided. The underlying orthophoto image redistribution conditions need checking.

See [methodology](../../docs/methodology/khirbet_orthophoto_building_change.md) and [notebook review](../../code/notebooks/README.md).
