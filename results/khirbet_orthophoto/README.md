# Results — Khirbet al-Fakheit Building Analysis

**Interpretation status:** Preliminary, model-based, and **not independently validated**.

This analysis investigates potential building changes in a 1 × 1 km study area in Khirbet al-Fakheit, Masafer Yatta, using high-resolution GeoMOLG orthophotos from 2021, 2022, and 2023.

Building segmentation was performed using the pretrained HOTOSM DINOv3 Buildings Small model. The analysis uses orthophotos resampled to 30 cm resolution and a building probability threshold of 0.30.

The updated notebook successfully executed the full-area segmentation and pixel-based change detection. Building probabilities were calculated using a sigmoid transformation of the ONNX model logits.

## 1. Detected Building Areas

The following building areas were calculated dynamically from the segmentation masks:

| Year | Detected building area (m²) |
|---|---:|
| 2021 | 3,268.75 |
| 2022 | 3,542.51 |
| 2023 | 3,021.89 |

The detected building area increased between 2021 and 2022, followed by a decrease in 2023.

These changes represent differences in model-predicted building coverage rather than independently confirmed construction or demolition.

## 2. Building Change Detection

Pixel-based comparisons were performed between the binary building segmentation masks for three periods.

| Period | Building gain (m²) | Building loss (m²) | Net change (m²) |
|---|---:|---:|---:|
| 2021–2022 | 1,455.89 | 1,182.13 | +273.76 |
| 2022–2023 | 719.26 | 1,239
