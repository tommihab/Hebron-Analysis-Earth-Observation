# Results and interpretation: Khirbet al-Fakheit building change

## Scope

This section interprets potential building changes in a 1 × 1 km study area in Khirbet al-Fakheit, Masafer Yatta, using high-resolution GeoMOLG orthophotos from 2021, 2022, and 2023. Building segmentation was performed using the pretrained HOTOSM DINOv3 Buildings Small model. Results are preliminary and have not been independently validated.

## Interpretation

The analysis identified variations in model-predicted building coverage across the three years. Detected building area increased from **3,268.75 m² in 2021 to 3,542.51 m² in 2022**, before declining to **3,021.89 m² in 2023**.

Between 2021 and 2023, approximately **1,083.44 m² of potential building gain** and **1,330.30 m² of potential building loss** were detected, resulting in a net decrease of **246.86 m²**. Approximately **1,938.45 m²** remained consistently classified as buildings.

The relatively large gross changes compared with the smaller net change suggest substantial differences between annual segmentation masks. However, these differences cannot be interpreted as confirmed construction or demolition without verification against the original orthophotos.

## Method-specific uncertainty

**Building segmentation.** The original approximately 15 cm orthophotos were resampled to 30 cm. The DINOv3 model was applied using sliding-window inference and a building probability threshold of 0.30. Detection accuracy may be affected by roof materials, shadows, illumination, spatial resolution, and model generalisation to local building characteristics.

**Change detection.** Binary segmentation masks were compared pixel by pixel to distinguish stable buildings, potential gains, and potential losses. Residual geometric misalignment between acquisition years may produce false changes. SIFT/RANSAC registration was tested but not applied because it did not demonstrate a clear improvement.

**Validation.** No independent building reference dataset or quantitative accuracy assessment was used. The detected changes therefore represent variations in predicted building coverage rather than verified physical changes.

## Sources and provenance

- Orthophoto source: GeoMOLG imagery (2021–2023).
- Processing notebook: `code/notebooks/khirbet_al_fakheit_orthophotos.ipynb`.
- Results and figures: `results/khirbet_orthophoto/`.
- Change statistics: `results/khirbet_orthophoto/statistics/Khirbet_Building_Statistics_Combined.csv`.
- Detailed methodology: `docs/methodology/khirbet_orthophoto_building_change.md`.
