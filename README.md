# Monitoring Land Cover Changes in the West Bank Using Optical Earth Observation and Machine Learning

A GeoHumanitarian Action project from Ashley Zhang, Rocío López, Axcel Ishimwe and Tommi Haberstock

## Project Overview

This project investigates land-cover changes in the West Bank, Palestine, using optical Earth observation data and machine-learning techniques. The analysis combines regional-scale satellite observations with local high-resolution orthophotos to examine vegetation dynamics and changes in the built environment.

The project focuses on the Hebron Governorate, including a detailed case study in Khirbet al-Fakheit.

## Research Objectives

- Monitor vegetation and built-up land-cover changes using Sentinel-2 imagery.
- Compare historical and recent observations to identify spatial patterns of change.
- Investigate building changes using high-resolution orthophotos and pretrained deep-learning models.
- Evaluate methodological limitations, classification uncertainties, and the potential of combining different Earth observation datasets.

## Project Analyses

### 1. Regional Land-Cover Change and classification — Hebron

Sentinel-2 and Dynamic World analysis of potential
vegetation and built-up area changes (2020–2026).

## Olive Land Cover Classification

A notebook and associated datasets have been generated as part of the Olive Loss classification analysis.

- **Code:** [Olive Land Cover Classification Notebook](code/notebooks/olive_land_cover_classification.ipynb)
- **Data:** [Olive Land Cover Classification Datasets](https://github.com/tommihab/Hebron-Analysis-Earth-Observation/tree/main/data/olive_land_cover_classification)
- **Geovisualization (QGIS Project):** [Olive Land-Cover Classification QGIS](https://github.com/tommihab/Hebron-Analysis-Earth-Observation/tree/main/gis_projects/qgis)

### 2. High-Resolution Orthophoto Analysis — Khirbet al-Fakheit

Historical GeoMOLG orthophotos (2021–2023),
geometric consistency assessment, and experimental
deep-learning-based building segmentation.

[View methodology, workflow and documentation](README_ORTHOPHOTO_ANALYSIS.md)

### 3. High-Resolution Orthophoto Analysis — Wadi Sa'ir
Historical GeoMOLG orthophotos (2021–2023),
GeoAI segmentation (QGIS plug-in) and machine learning (Random forest) Land Cover classification.

[View methodology, workflow and documentation]()


### 4. Analyses Ashley


### 5. Analyses Axcel

## Data and Methods

View the specific README of each analysis for Data and Methods

## Repository Contents

- `data/` — Input datasets, reference data, and processing outputs
- `code/` — Analysis scripts and notebooks
- `results/` — Maps, figures, tables, and validation outputs
- `gis_projects/` — GIS project files
- `docs/` — Methodology, interpretation, findings, and limitations
- `presentation slides/` — Reports and presentations

## License
See LICENSE file.
