# Methodology — High-Resolution Orthophoto Building Change Detection

## Aim and Study Area

This analysis investigates potential building changes between 2021 and 2023 in a **1 × 1 km study area in Khirbet al-Fakheit, Masafer Yatta (West Bank)**. The study area is centred at 31.37662°N, 35.16619°E (EPSG:28191).

## 1. Data Acquisition and Preprocessing

Historical GeoMOLG orthophotos from **2021, 2022 and 2023** were retrieved through ArcGIS MapServer REST services using Python in Google Colab.

For each year, four RGB tiles were downloaded and mosaicked into a 6668 × 6668-pixel GeoTIFF at approximately **15 cm spatial resolution**. The imagery was subsequently resampled to **30 cm** for building segmentation.

Geometric consistency was investigated using SIFT feature matching and RANSAC. As no clear improvement was achieved, no additional geometric transformation was applied.

## 2. Building Segmentation

Building detection was performed using the pretrained [HOTOSM DINOv3 Buildings Small](https://huggingface.co/hotosm/dinov3s-buildings) model (DINOv3 ViT-S/16 encoder and UperNet decoder).

The ONNX model was applied using sliding-window inference with **256 × 256-pixel windows and a stride of 192 pixels**. Overlapping predictions were averaged, and model logits were converted into building probabilities using a sigmoid transformation.

Different probability thresholds (0.20, 0.30, 0.40, 0.4371 and 0.50) and spatial resolutions (15 cm and 30 cm) were compared. The final analysis used **30 cm resolution and a probability threshold of 0.30**.

## 3. Building Change Detection

Binary building masks were generated for each year and compared pixel by pixel for three periods:

- 2021–2022
- 2022–2023
- 2021–2023

Four classes were distinguished: stable background, stable buildings, potential building gain and potential building loss.

Change areas were calculated from the number of classified pixels multiplied by the raster pixel area. Net change was calculated as building gain minus building loss.

The workflow generated building probability maps, binary segmentation masks, change-detection GeoTIFFs, statistical tables and visualisations.

## 4. Limitations

The results represent **potential changes in model-predicted building coverage**, not independently confirmed construction or demolition.

Uncertainty arises from residual geometric misalignment, shadows, illumination differences, roof characteristics, model generalisation, resampling and threshold sensitivity. The SIFT/RANSAC registration test was conducted separately and is not included in the main Colab notebook.

No independent quantitative accuracy assessment against reference building footprints has been performed.

## Sources and Reproducibility

- [HOTOSM DINOv3 Buildings Small](https://huggingface.co/hotosm/dinov3s-buildings)
- Data sources: [`metadata/khirbet_orthophoto_data_sources.csv`](../../metadata/khirbet_orthophoto_data_sources.csv)
- Processing notebook: [`code/notebooks/khirbet_al_fakheit_orthophotos.ipynb`](../../code/notebooks/khirbet_al_fakheit_orthophotos.ipynb)
- Results: [`results/khirbet_orthophoto/`](../../results/khirbet_orthophoto/)
