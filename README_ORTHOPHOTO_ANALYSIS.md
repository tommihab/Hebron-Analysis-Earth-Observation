# High-resolution orthophoto analysis — Khirbet al-Fakheit (2021–2023)

**Project:** Monitoring Land Cover Changes in the West Bank Using Optical Earth Observation and Machine Learning

This subproject investigates potential building-footprint changes in a **1 × 1 km** area near Khirbet al-Fakheit (Masafer Yatta), using GeoMOLG RGB orthophotos for **2021, 2022, and 2023** and the HOTOSM DINOv3 Buildings Small model. It complements the regional Hebron Sentinel-2 / Dynamic World analysis.

## At a glance

| Item | Recorded in submitted notebook |
|---|---|
| Area | 1 km × 1 km, centred approximately on 31.37662°N, 35.16619°E |
| Original imagery | RGB orthophotos, approximately 15 cm |
| Resampled imagery | approximately 30 cm; full raster 3334 × 3334 px |
| Coordinate system | EPSG:28191 (Palestine 1923 / Palestine Grid) |
| Provider | GeoMOLG REST MapServer endpoints |
| Model | [`hotosm/dinov3s-buildings`](https://huggingface.co/hotosm/dinov3s-buildings), ONNX |
| Architecture | DINOv3 ViT-S/16 encoder + UperNet decoder |
| Inference | 256 × 256 sliding windows, 192 px stride, 0.30 threshold used in final full-AOI run |
| Changes | Pixel-level comparison: 2021–2022, 2022–2023, 2021–2023 |
| Validation | No independent manual reference validation documented in supplied notebook |

## Repository contents

- [`code/notebooks/khirbet_al_fakheit_orthophotos.ipynb`](code/notebooks/khirbet_al_fakheit_orthophotos.ipynb): the submitted Colab notebook, **without rewritten analysis code**; outputs were already cleared on upload.
- [`code/notebooks/README.md`](code/notebooks/README.md): execution instructions, dependencies and a reproducibility warning.
- [`code/orthophotos/inference_helpers.py`](code/orthophotos/inference_helpers.py): example missing helper functions, **not integrated into the original notebook; must be reviewed/tested**.
- [`docs/methodology/khirbet_orthophoto_building_change.md`](docs/methodology/khirbet_orthophoto_building_change.md): method description.
- [`docs/workflows/khirbet_orthophoto_workflow.md`](docs/workflows/khirbet_orthophoto_workflow.md): workflow and Mermaid flowchart.
- [`metadata/khirbet_orthophoto_data_sources.csv`](metadata/khirbet_orthophoto_data_sources.csv): exact input service URLs and key metadata.
- [`metadata/khirbet_orthophoto_processing.md`](metadata/khirbet_orthophoto_processing.md): processing parameters and provenance.
- [`results/khirbet_orthophoto/`](results/khirbet_orthophoto/): notebook-reported statistics and an output manifest, not an independent validation dataset.
- [`experiments/khirbet_orthophoto_experiment_log.md`](experiments/khirbet_orthophoto_experiment_log.md): threshold/resolution tests and an external registration test note.

## Data access

Full GeoTIFF mosaics, model weights and large inference outputs are not committed to GitHub. See [data storage notes](data/orthophotos/README.md).
