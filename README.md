# Monitoring Land Cover Changes in the West Bank Using Optical Earth Observation and Machine Learning

A HeoHumanitarian Action project from Ashley Zhang, Rocío López, Axcel Ishimwe and Tommi Haberstock

## Project Overview

This project investigates land-cover changes in the West Bank, Palestine, using optical Earth observation data and machine-learning techniques. The analysis combines regional-scale satellite observations with local high-resolution orthophotos to examine vegetation dynamics and changes in the built environment.

The project focuses on the Hebron Governorate, including a detailed case study in Khirbet al-Fakheit.

## Research Objectives

- Monitor vegetation and built-up land-cover changes using Sentinel-2 imagery.
- Compare historical and recent observations to identify spatial patterns of change.
- Investigate building changes using high-resolution orthophotos and pretrained deep-learning models.
- Evaluate methodological limitations, classification uncertainties, and the potential of combining different Earth observation datasets.

## Project Analyses

### 1. Regional Land-Cover Change — Hebron

Sentinel-2 and Dynamic World analysis of potential
vegetation and built-up area changes (2020–2026).

### 2. High-Resolution Orthophoto Analysis — Khirbet al-Fakheit

Historical GeoMOLG orthophotos (2021–2023),
geometric consistency assessment, and experimental
deep-learning-based building segmentation.

[View methodology, workflow and documentation](README_ORTHOPHOTO_ANALYSIS.md)

## Data and Methods

The project uses Sentinel-2 Level-2A imagery, Google Earth Engine, historical orthophotos from GeoMOLG, and Python-based geospatial and machine-learning workflows.

## Interactive Results

Explore the combined vegetation and built-up land-cover change analysis for the Hebron study area.

**[View the interactive land-cover change map in ArcGIS Online](https://experience.arcgis.com/experience/b3d5ab018e5e46ba85facca4bc0b9f58)**

The analysis compares a June–September 2020–2022 baseline with 2026 using Sentinel-2 imagery and Dynamic World built-up probabilities.

For further information, see the [results documentation](results/hebron_landcover_change/arcgis_online.md).

## Repository Contents

- `data/` — Input datasets, reference data, and processing outputs
- `metadata/` — Data provenance and processing documentation
- `code/` — Analysis scripts and notebooks
- `experiments/` — Methodological tests and experimental results
- `results/` — Maps, figures, tables, and validation outputs
- `gis_projects/` — GIS project files
- `docs/` — Methodology, interpretation, findings, and limitations
- `presentation slides/` — Reports and presentations

## Reproducibility

Instructions for accessing datasets, setting up the computational environment, and executing the analytical workflow will be provided in the relevant repository folders.

## Project Status

Ongoing academic research project. Findings and validation results will be added as the analyses are completed.
