# High-resolution GeoMOLG orthophoto data

## Source and coverage

The local analysis uses imagery accessed from GeoMOLG orthophoto services for 2021, 2022, and 2023 within a 1 × 1 km AOI in **Khirbet al-Fakheit, Masafer Yatta**.

| Property | Value / status |
|---|---|
| Source | GeoMOLG historical orthophoto map services |
| Years | 2021, 2022, 2023 (layer years; **acquisition dates unverified**) |
| Nominal resolution | approximately 15 cm |
| Coordinate reference system | EPSG:28191 |
| Tile acquisition | four image tiles per year (reported workflow) |
| Mosaic dimensions | 6668 × 6668 pixels per year |
| Number of annual mosaics | 3 |
| Source data stored on GitHub? | No; large rasters should be archived externally |

## File roles

- `raw/`: original downloaded tiles, unchanged.
- `processed/`: mosaicked 2021/2022/2023 GeoTIFFs.
- `test_patches/`: 1536 × 1536 px image patches for experimental model inference.
- `predictions/`: **only if produced**, georeferenced probability maps or masks from building segmentation.

None of these raster directories is supplied in this documentation package. Do not claim a data file is available in this repository unless you have uploaded or linked it.

## Access and provenance

See [`metadata/khirbet_orthophoto_sources.csv`](../../metadata/khirbet_orthophoto_sources.csv) for service identifiers previously used in Colab. Source endpoint URLs, exact observation dates, permitted reuse/redistribution and tile bounding boxes need to be verified before publishing the underlying imagery. If redistribution is not permitted, provide access instructions and provenance rather than uploading raster copies.

## Spatial consistency

Each annual mosaic should have its own GeoTIFF CRS, affine transform, bounds and pixel resolution checked. Identical pixel dimensions alone **do not guarantee** coregistration. RGB PNG patches do not preserve GeoTIFF georeferencing without separate transform/extent metadata.
