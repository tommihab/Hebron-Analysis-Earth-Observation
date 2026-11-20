# Khirbet al-Fakheit — High-Resolution Orthophoto Analysis

## Project component

This is the **local, high-resolution** component of the West Bank land-cover change project. It investigates the potential of historical orthophotos and pretrained building segmentation to identify changes in the built environment in **Khirbet al-Fakheit, Masafer Yatta**.

- **Area of interest (AOI):** approximately 1 km × 1 km
- **Source:** GeoMOLG historical orthophoto services
- **Years:** 2021, 2022, and 2023 (service/layer years; exact acquisition dates require verification)
- **Nominal pixel size:** approximately 0.15 m
- **CRS:** EPSG:28191
- **Processing environment:** Python / Google Colab
- **Current outcome:** annual orthophoto mosaics and test patches; registration experiment evaluated; building-segmentation testing is experimental and does **not** yet constitute validated building-change results.

## Reproducibility and navigation

| Resource | Path |
|---|---|
| Executable Google Colab notebook | `code/notebooks/khirbet_al_fakheit_orthophotos.ipynb` **(upload original notebook separately)** |
| Notebook setup / usage | [`code/notebooks/README.md`](code/notebooks/README.md) |
| Data availability and formats | [`data/orthophotos/README.md`](data/orthophotos/README.md) |
| Source inventory | [`metadata/khirbet_orthophoto_sources.csv`](metadata/khirbet_orthophoto_sources.csv) |
| Processing metadata | [`metadata/khirbet_orthophoto_processing.md`](metadata/khirbet_orthophoto_processing.md) |
| Scientific methods | [`docs/methodology/khirbet_orthophoto_building_detection.md`](docs/methodology/khirbet_orthophoto_building_detection.md) |
| Workflow | [`docs/workflows/khirbet_orthophoto_workflow.md`](docs/workflows/khirbet_orthophoto_workflow.md) |
| Registration test | [`experiments/registration_sift_ransac.md`](experiments/registration_sift_ransac.md) |
| Model test | [`experiments/hotosm_model_test.md`](experiments/hotosm_model_test.md) |
| Results and limitations | [`results/khirbet_orthophoto/README.md`](results/khirbet_orthophoto/README.md) |

**Important:** This documentation reflects the workflow described to date. It is not a code audit: parameter values, service identifiers, and outputs should be checked against the exported Colab notebook before the repository is treated as fully reproducible.
