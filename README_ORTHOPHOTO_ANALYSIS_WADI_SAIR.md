# High-resolution orthophoto analysis — Wadi Sa'ir (2021–2023)

Project: Monitoring Olive Land Cover Changes in the West Bank Using Optical Earth Observation and Machine Learning

This subproject investigates potential Olive Land Cover changes in an area near Wadi Sa'ir , using GeoMOLG RGB orthophotos for **2021 and 2023** and the HOTOSM DINOv3 Buildings Small model. It complements the regional Hebron Sentinel-2 / Dynamic World analysis.

## Summary

| Item | Recorded in submitted notebook |
|---|---|
| Area | 1 km × 1 km, centred approximately on 31.598383°N, 35.180432°E, a military tower |
| Original imagery | RGB orthophotos, approximately 15 cm |
| Coordinate system | EPSG:28191 (Palestine 1923 / Palestine Grid) |
| Provider | GeoMOLG REST MapServer endpoints |
| Image segmentation  | SLIC (object size = 4 m²)
| Classification model | Random Forest |Four land-cover classes: **Tree, Low vegetation, Road, Bare soil**
| Changes | Pixel-level comparison on the classification output: 2021–2023 |
| Validation | No independent manual reference validation documented in supplied notebook |

## Repository contents

- : the submitted Colab notebook, **without rewritten analysis code**.

## Data access

## Data

The orthophotos and the RGB mosaics generated for the analysis are stored in Google Drive:

- **Orthophotos and generated mosaics:** [Google Drive – Orthophotos and Mosaics](https://drive.google.com/drive/folders/1ZZuSBn9bbyTMVnzOJMCqI82-TKL0fHZ8?usp=sharing)

The notebook includes the corresponding cells for generating the orthophotos and RGB mosaics. However, the land-cover classification was performed separately in **QGIS**, using image segmentation and a Random Forest classifier.

The outputs generated during the classification workflow are stored in a separate Google Drive folder:

- **Land-cover classifications:** Classification results for each RGB composite.
- **Change detection:** Difference raster comparing the two classifications.
- **Classification ROI:** Smaller Region of Interest used for the classification process.

[Google Drive – Classification Results and ROI](https://drive.google.com/drive/folders/1LN9wz3L8HzCa_OVkisOxPq2YCg6O2yaJ?usp=sharing)

Please download the required files from the corresponding folders before running the analysis or opening the QGIS project.
