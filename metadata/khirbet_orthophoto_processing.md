# Processing metadata — Orthophoto segmentation

**Source evidence:** uploaded `khirbet_al_fakheit_orthophotos.ipynb.ipynb` (20 cells; outputs cleared), and the user-supplied data/workflow slides. All paths below refer to code constants, not to files verified as archived in GitHub.

| Variable | Value from source |
|---|---|
| AOI centre | latitude 31.37662, longitude 35.16619 (EPSG:4326) |
| AOI definition | a 1000 m square, centred after transformation to EPSG:28191 |
| Original raster | EPSG:28191, 6668 × 6668 px, 3-band RGB, uint8 LZW TIFF |
| Tile size/count | 3334 × 3334 px; 2 × 2 tiles per year |
| Effective original cell size | 1000/6668 m ≈ 0.14997 m |
| Resampled full raster | 3334 × 3334 px, ≈ 0.29994 m |
| Test patch | 1536 × 1536 px, centered at x=0.50, y=0.45 of the raster |
| Resampled test patch | 768 × 768 px with cv2.INTER_AREA |
| Full-image resampling | Rasterio Resampling.average |
| Model | hotosm/dinov3s-buildings, model.onnx, SHA dynamically resolved (not captured in uploaded outputs) |
| Sliding window | 256 px |
| Stride | 192 px |
| Patch threshold candidates | 0.20, 0.30, 0.40, 0.4371, 0.50 |
| Full-AOI threshold | 0.30 |
| Comparison periods | 2021–2022; 2022–2023; 2021–2023 |
| Building area | predicted building-pixel count × affine pixel area |
| Net/gross change | gain − loss / gain + loss |
| Primary storage path in Colab | `/content/orthophotos` (ephemeral unless exported) |

## Source code limitations

The input and output tensor contract of the model is not verified in the submitted notebook. Missing inference helper definitions prevent a clean reproducible run in that form. See `code/notebooks/README.md`.

The notebook does **not** contain the reported SIFT/RANSAC registration test. Its common grid check confirms matching raster geometry, not true image-to-image co-registration of building pixels.

## Provenance of final figures

The final two chart cells contain manually entered area values, not CSV import nor a direct reference to the computed DataFrames. Transcribed values should remain flagged as unverified until a full rerun reproduces them and the underlying GeoTIFFs or computed CSV outputs are retained.
