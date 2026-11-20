# Workflow — Khirbet al-Fakheit orthophoto analysis

The flowchart follows the provided presentation slide and is expanded using the uploaded Colab source.

```mermaid
flowchart TD
    A[GeoMOLG RGB orthophotos 2021 to 2023] --> B[Define 1 km square AOI in EPSG:28191]
    B --> C[Download 2 x 2 tiles per year and mosaic]
    C --> D[Compare imagery and resample 15 cm to 30 cm]
    D --> E[HOTOSM DINOv3 Small plus UperNet inference]
    E --> F[Sliding window 256 px / stride 192]
    F --> G[Compare thresholds on test patches]
    G --> H[Use threshold 0.30 for full AOI]
    H --> I[Binary building masks for 2021, 2022 and 2023]
    I --> J[Pixel-based building change: 2021-22, 2022-23, 2021-23]
    J --> K[Area statistics and visual assessment]
```

## Processing stages

1. **Source selection:** GeoMOLG 2021, 2022, 2023 RGB orthophoto services; center 31.37662°N, 35.16619°E; 1 × 1 km in EPSG:28191.
2. **Tile extraction and mosaicking:** Each year consists of four 3334 × 3334 px tiles forming a 6668 × 6668 px georeferenced raster.
3. **Resolution tests:** Extract 1536 × 1536 px test patches. Downsample from ~15 cm to ~30 cm and compare predicted buildings across both resolutions.
4. **Model prediction:** Load pretrained `hotosm/dinov3s-buildings` ONNX; 256 px windows, 192 px stride and averaged overlaps. Threshold tests on patches compare 0.20, 0.30, 0.40, 0.4371 and 0.50.
5. **Full-AOI inference:** Downsample full images to 3334 × 3334 px (~30 cm), select 0.30 threshold, and export building probability and binary-mask GeoTIFFs for each year.
6. **Change detection:** Classify transitions between predicted binary building masks as stable, gain, or loss over each of three comparison periods.
7. **Statistics and visualization:** Calculate areas from pixel counts and georeferenced pixel area; create overview maps, zoom images and charts.

## Known unimplemented/missing steps

- The supplied notebook has two missing helper function definitions needed for the inference cell.
- Model preprocessing and output postprocessing need verification.
- No independently validated building change accuracy assessment is supplied.
- A SIFT/RANSAC image-registration experiment was previously discussed but is **not** in the uploaded notebook.

See [methodology](../methodology/khirbet_orthophoto_building_change.md) and [notebook review](../../code/notebooks/README.md).
