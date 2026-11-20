# Khirbet al-Fakheit orthophoto analysis — results

## Currently documented outputs

- 2021, 2022 and 2023 yearly GeoTIFF mosaics (6668 × 6668 px), held outside GitHub.
- Three 1536 × 1536 px test patches, held outside GitHub unless small and distribution is permitted.
- SIFT/RANSAC registration test, documented in `experiments/registration_sift_ransac.md`.
- Exploratory pretrained-model workflow, documented in `experiments/hotosm_model_test.md`.

## What is **not** yet evidenced

- Validated yearly building footprint datasets.
- Verified building construction, demolition or footprint change counts/areas.
- Independent accuracy assessment of segmentation outputs.

## Add future outputs here

When available, add small figures under `figures/`, summary statistics under `statistics/`, and a concise interpretation with references to the code and source dates. Store large georeferenced masks externally and record their exact locations, CRS, pixel size and checksum.

### Suggested figure set

1. Three-panel 2021/2022/2023 orthophoto comparison at the same spatial extent.
2. Original versus attempted registration at stable structures.
3. Original image and model probability map overlay (for each year).
4. Verified building-change candidates with reference-image evidence and uncertainty.

Images and statistics should not be added as results before they actually exist.
