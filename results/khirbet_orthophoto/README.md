# Results — Khirbet al-Fakheit Building Analysis

**Interpretation status:** Preliminary, model-based, and **not independently validated**.

This analysis investigates potential building changes in a 1 × 1 km study area in Khirbet al-Fakheit, Masafer Yatta, using high-resolution GeoMOLG orthophotos from 2021, 2022, and 2023.

Building segmentation was performed using the pretrained HOTOSM DINOv3 Buildings Small model. The orthophotos were resampled to 30 cm resolution, and a building probability threshold of 0.30 was applied.

## 1. Detected Building Areas

| Year | Detected building area (m²) |
|---|---:|
| 2021 | 3,268.75 |
| 2022 | 3,542.51 |
| 2023 | 3,021.89 |

Detected building coverage increased between 2021 and 2022, followed by a decrease in 2023.

## 2. Building Change Detection

Pixel-based comparisons of the segmentation masks were conducted for three periods.

| Period | Building gain (m²) | Building loss (m²) | Net change (m²) |
|---|---:|---:|---:|
| 2021–2022 | 1,455.89 | 1,182.13 | +273.76 |
| 2022–2023 | 719.26 | 1,239.88 | -520.62 |
| 2021–2023 | 1,083.44 | 1,330.30 | -246.86 |

### Building Change Categories (2021–2023)

| Category | Area (m²) |
|---|---:|
| Stable buildings | 1,938.45 |
| Potential building gain | 1,083.44 |
| Potential building loss | 1,330.30 |
