# Methodology — Historical orthophotos and building segmentation

## Aim

Evaluate very-high-resolution historical orthophotos as a potential source for identifying changes in building footprints between 2021 and 2023 in a local 1 × 1 km case study in **Khirbet al-Fakheit, Masafer Yatta**. The focus is on **buildings**; solar panels remain a possible later investigation and are not reported here as completed results.

## 1. Source imagery and preparation

Historical GeoMOLG orthophoto layers labelled 2021, 2022 and 2023 were accessed in Python/Google Colab. The imagery was retrieved as multiple tiles and mosaicked into annual GeoTIFFs at approximately 15 cm resolution in EPSG:28191. Four downloaded tiles per year and output dimensions of 6668 × 6668 pixels were reported.

The layer year should not be confused with the precise imagery acquisition date; exact dates should be added if source metadata allows.

## 2. Geometric consistency

Cross-year image registration was tested using feature matching with SIFT and RANSAC. The tested transformation did not demonstrate a sufficiently clear and consistent advantage, so **no global geometric correction was adopted**. This preserves source geometry but does not prove sub-pixel alignment; local errors can create false detections near building edges.

## 3. Experimental patches and resampling

Three test patches measuring 1536 × 1536 pixels were extracted for inspection and model inference. A ~30 cm resampled version was also explored for testing. Retain the patch's spatial window/extent separately when exporting RGB PNGs, because PNGs are normally not georeferenced.

## 4. Experimental building model

A pretrained Humanitarian OpenStreetMap Team (HOTOSM) building-segmentation model was evaluated as a possible way to derive building probability masks from RGB orthophotos:

- Model source: <https://huggingface.co/hotosm/dinov3s-buildings>
- Model: DINOv3 ViT-S/16 backbone with UperNet segmentation decoder.
- Inference artifact: `model.onnx`.
- The model card specifies a 256-pixel sliding window, 192-pixel stride and default threshold of 0.4371.

The **actual Colab notebook must confirm** which model revision and settings were used and whether inference completed successfully. No segmentation-accuracy measurements or validated building-change estimates are supplied here.

## 5. Change-detection requirements

A credible 2021–2023 change product would require (1) comparable and correctly georeferenced annual image/mask grids; (2) model predictions for each year; (3) thresholding and post-processing documented consistently; (4) matching of change candidates across dates; and (5) manual or independent validation against the original orthophotos.

A difference between model predictions may arise from illumination, viewpoint, shadows, orthorectification, roofing material, or model uncertainty rather than real building construction or removal.

## Current conclusion

The source imagery preparation and exploratory registration tests are documented. **Validated building change detection is not yet demonstrated** by the information currently available.
