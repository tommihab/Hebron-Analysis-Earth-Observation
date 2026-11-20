# Processing metadata — Khirbet al-Fakheit

## Dataset and geometry

- Study site: Khirbet al-Fakheit, Masafer Yatta, West Bank.
- AOI: approximately 1 km × 1 km; **exact AOI geometry is not included** in this package.
- Orthophoto service years: 2021, 2022, 2023.
- Reported native resolution: ~0.15 m; source projection EPSG:28191.
- Expected yearly mosaic dimensions from the reported workflow: 6668 × 6668 pixels.

## Processing lineage

| Stage | Recorded setting / outcome | Evidence still needed |
|---|---|---|
| Query and download | GeoMOLG annual orthophoto map services; 4 tiles per year | Exact endpoints, AOI bounding box, request parameters |
| Mosaicking | 3 yearly GeoTIFF mosaics; 6668 × 6668 px | Actual output filenames and geotransforms |
| Geometric evaluation | SIFT matching + RANSAC tests across years | Match counts, residuals, before/after comparison figures |
| Decision | No geometric transform applied because improvement was not clear | Reproducible comparison statistics |
| Sampling | Three 1536 × 1536 px test patches reported | Pixel windows and/or geographic extents |
| ML preparation | Experimental resampling to ~0.30 m | Resampling code and output dimensions |
| Building segmentation | HOTOSM ONNX model testing | Exact model revision, prediction masks, review metrics |
| Change detection | Not yet established as a validated outcome | Consistent year-wise masks, alignment checks and reference validation |

## Reproducibility checklist

- [ ] Store AOI geometry as a small, permitted GeoJSON or GeoPackage.
- [ ] Record source endpoint and date of access for each year.
- [ ] Record actual image-acquisition dates when available.
- [ ] Preserve filenames, bounds, CRS and geotransforms of each annual GeoTIFF.
- [ ] Add raw-to-processed filename mapping and data storage locations.
- [ ] Document library versions and notebook runtime assumptions.
- [ ] Record model version/checkpoint and parameters from the actual code.
- [ ] Provide validation for segmentation and any detected between-year changes.

## Licensing

Source data reuse/distribution permissions for GeoMOLG orthophotos have **not been verified** here. Do not upload original rasters until the terms have been checked.
