# Methodology — high-resolution orthophoto building change detection

## Aim and area

Assess potential changes in mapped building footprint area in a **1 km × 1 km** study area around Khirbet al-Fakheit, Masafer Yatta (West Bank), between 2021 and 2023. The study area is constructed as a 1,000 m square in **EPSG:28191**, centred on WGS84 latitude **31.37662**, longitude **35.16619**. The AOI is exported as GeoJSON in EPSG:4326.

## 1. Data acquisition

Three GeoMOLG orthophoto ArcGIS MapServer services are queried via REST (`f=pjson`) and their `/export` endpoints for **2021, 2022 and 2023**. For each date, the notebook requests **four 3334 × 3334 px RGB PNG tiles** across a shared grid, verifies the tile extent, and writes the tiles into one **6668 × 6668 px GeoTIFF** covering the 1 × 1 km AOI. RGB bands are stored as `uint8` with LZW compression.

The effective raster cell size follows from the requested extent, about **0.150 m/pixel** (1,000 m / 6,668 px), not a separately verified original camera GSD. The `f=image` branch is used as a fallback when the JSON export's image link cannot be fetched.

## 2. Patches and resolution comparison

A **1536 × 1536 px** patch is extracted per year, centred around 50% of image width and 45% of image height. Each patch is also downsampled to **768 × 768 px** using OpenCV `INTER_AREA`. The notebook generates side-by-side visual comparisons of **15 cm vs. 30 cm** images and corresponding segmentation outputs.

## 3. Pretrained building segmentation

The script downloads the ONNX file `model.onnx` for [`hotosm/dinov3s-buildings`](https://huggingface.co/hotosm/dinov3s-buildings), and records the model repository's current revision in a session variable. It implements sliding-window inference using **256 × 256** windows and **192 px** stride, averaging overlapping output maps. The model is described as a frozen **DINOv3 ViT-S/16** feature encoder with a **UperNet** segmentation decoder.

The model card lists **0.4371** as a published default probability threshold. The study compares thresholds **0.20**, **0.30**, **0.40**, **0.4371** and **0.50** on the test patches. The final full-AOI implementation chooses **0.30** at **approximately 30 cm** resolution, as specified in notebook cells; it should be described as a selected experimental setting, not necessarily an optimal or independently validated one.

**Reproducibility caveat:** In the submitted notebook, `get_window_positions()` and `preprocess_window()` are called without definitions. The ONNX output is additionally passed through `expit(logits[0,0])`, but the correct output channel and required activation for this ONNX export have not been confirmed. The analysis needs a successful rerun and model-contract check before claiming full reproducibility. A proposed helper module is supplied separately; the original notebook has not been altered.

## 4. Full-area inference and pixel-based change detection

The full 6668 × 6668 images are downsampled to **3334 × 3334 px** while preserving the nominal 1,000 × 1,000 m footprint. The notebook checks that raster shape, CRS, and affine transforms agree for all three years. It then intends to export for each year:

- `Building_Probability_{year}.tif`: float32 building prediction map;
- `Building_Mask_{year}.tif`: uint8 binary predicted building mask;
- `Building_Change_{period}.tif`: 0 background, 1 stable building, 2 potential gain, 3 potential loss for the paired dates.

Change is calculated independently for each pair **2021–2022**, **2022–2023**, **2021–2023**. Every pixel transitions between binary building/non-building predictions. Areas are calculated as class-pixel counts multiplied by the area derived from the raster affine transform. Gross change = gain + loss; net change = gain − loss; relative change = net / initial building area × 100%.

## 5. Outputs, interpretation and validation

The original code creates comparison figures, an exported CSV of period-level change statistics, and detail plots. Its final two visualisation cells contain fixed values and have not been verified against original computed arrays because neither the output GeoTIFFs nor the complete execution logs were uploaded. The numbers are transcribed in `results/khirbet_orthophoto/statistics/` with a provenance warning.

**Crucial limitation:** Matching raster shape/transform is not the same as geometric co-registration of actual image features. Small alignment or ortho-rectification errors can create false gain/loss around rooftops. Additional confounders include roof reflectance, shadows, occlusions, different image conditions, domain shift, threshold sensitivity and the absence of independently labelled buildings.

## Registration test provenance

A SIFT/RANSAC registration experiment was previously reported as not giving clear improvement and was therefore not applied. **No SIFT/RANSAC implementation is present in the notebook supplied here.** A reproducible registration test requires separate code and diagnostics; otherwise the method should be documented as an external exploratory step.

## References

- [HOTOSM DINOv3 Buildings Small model card](https://huggingface.co/hotosm/dinov3s-buildings)
- [HOTOSM fAIr model implementation and training configuration](https://github.com/hotosm/fAIr-models/blob/develop/models/dinov3s_buildings/README.md)
- Data service endpoints and access details: [`metadata/khirbet_orthophoto_data_sources.csv`](../../metadata/khirbet_orthophoto_data_sources.csv)
