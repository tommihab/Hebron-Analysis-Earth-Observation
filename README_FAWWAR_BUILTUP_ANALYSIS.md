# Al Fawwar Refugee Camp – Built-up Change Analysis (v2, noise-reduced)

## Purpose

Estimate built-up (roof and paved surface) change in and around Al Fawwar Refugee Camp (West Bank) between 2022-02-02 and 2026-01-29, using Esri World Imagery (Wayback). The analysis also quantifies how much of a simple image comparison is noise. It measures built-up footprint area, not the number of buildings.

## Files

- `fawwar_builtup_change_v2.py`: analysis script, exported from `fawwar_builtup_change_v2.ipynb` (Google Colab)
- Input files, to be placed in `/content/fawwar` in Colab (see below)

## Input data

| File | Content | Source | Notes |
|---|---|---|---|
| `20220202_Fawwar.tpkx` | Esri Wayback imagery, acquired 2022-02-02 | Esri World Imagery (Wayback) | Use the acquisition date from the metadata pop-up. Not included in the repository, see licence note |
| `20260129_Fawwar.tpkx` | Esri Wayback imagery, acquired 2026-01-29 | Esri World Imagery (Wayback) | Not included in the repository |
| `fawwar_camp_boundary.gpkg` | Camp boundary polygon, 0.284 km² | [source and date] | Used as the camp boundary |
| `road_network_roads.geojson` | Road network, 145 segments | [source, tool and download date] | Used to remove roads from built-up masks |

The four files above must be placed in `/content/fawwar`.

## Coordinate reference system and resolution

- Analysis CRS: EPSG:2039 (Israel TM Grid, metres)
- Imagery is read from the tile packages (Web Mercator, EPSG:3857) and reprojected with average resampling.
- Native ground resolution after reprojection: 2022 image 1.02 m; 2026 image 0.51 m
- Analysis resolution: 1.02 m (the coarser image), grid 1564 × 1364 px

## Method

1. Convert each `.tpkx` tile package to GeoTIFF at its highest level (2022: level 17; 2026: level 18).
2. Build a common grid. The analysis area is the camp plus a 200 m buffer.
3. Co-register the 2026 image to the 2022 image using phase correlation on edge images. The estimated shift was 1.32 m (dy −0.51 m, dx +1.22 m) and was applied.
4. Stretch contrast (1st–99th percentile) and match the histogram of the 2026 image to the 2022 image.
5. Compute per-pixel features: R, G, B, brightness, ExG, saturation, and texture (3 px and 7 px windows).
6. Cluster all pixels from both dates together with K-means (10 classes). Built-up classes were chosen by visual inspection: `BUILT_CLUSTERS = [1, 2, 4, 6]`.
7. Remove road strips from built-up masks. Road width depends on OSM road type, plus a 1 m margin. Road strips cover 11.6 % of the analysis area and contained 17.2 % (2022) and 18.9 % (2026) of the built-up pixels in the camp.
8. Exclude vegetation (ExG > 0.06). Apply a 3×3 majority filter, then closing and opening (1 m radius). Remove built-up patches smaller than 20 m².
9. Treat the darkest 8 % of pixels on either date as shadow. Shadow pixels are uncertain and excluded from change (13.8 % of the area).
10. Define change:
    - **New**: built-up in 2026, with no built-up within 2 m in 2022, and a clear spectral change (Otsu threshold 3.11)
    - **Lost**: built-up in 2022, with no built-up within 2 m in 2026, and a clear spectral change
    - Both must survive an opening with 1.5 m radius and cover at least 30 m².
11. Accuracy check: 20 random points per map class, judged on before/after image chips. Wrong points are entered manually in `WRONG_IDS`.
12. Summarise new and lost built-up in 50 m grid cells.

### Key parameters

| Parameter | Value | Meaning |
|---|---|---|
| `N_CLUSTERS` | 10 | K-means classes |
| `VEG_EXG` | 0.06 | Vegetation threshold |
| `MAX_SHIFT_M` | 15 | Largest co-registration shift accepted |
| `SHADOW_PCT` | 8 | Darkest share treated as shadow |
| `MIN_BUILT_M2` | 20 | Minimum built-up patch |
| `TOL_M` | 2.0 | Positional tolerance |
| `CHANGE_OPEN_M` | 1.5 | Opening radius for change patches |
| `MIN_CHANGE_M2` | 30 | Minimum change patch |
| `N_CHECK` | 20 | Accuracy sample points per class |
| `BUFFER_M` | 200 | Buffer around the camp |
| `GRID_M` | 50 | Summary grid cell size |
| `BUILT_CLUSTERS` | [1, 2, 4, 6] | Classes counted as built-up (set manually) |
| `TRAIN_FILE` | None | Random Forest not used |

## Results

| | Camp (0.284 km²) | Surroundings, 200 m ring (0.771 km²) |
|---|---|---|
| Built-up share, 2022 | 48.4 % | 24.3 % |
| Built-up share, 2026 | 44.4 % | 25.0 % |
| Confirmed new built-up (v2) | 1,498 m² | 22,410 m² |
| Confirmed lost built-up (v2) | 1,372 m² | 7,923 m² |
| Simple comparison, new (v1) | 28,971 m² | 87,252 m² |
| Simple comparison, lost (v1) | 52,999 m² | 95,167 m² |

- About 96.5 % of the simple-comparison change in the camp, and 83.4 % in the ring, was removed as noise.
- Lost-candidate patches: 93. New-candidate patches: 166 (20 inside the camp, 146 outside).

Accuracy check (80 points):

| Map class | Correct | Accuracy |
|---|---|---|
| Built-up, no change | 19 / 20 | 95 % |
| Not built | 19 / 20 | 95 % |
| New | 16 / 20 | 80 % |
| Lost | 8 / 20 | 40 % |
| **Overall** | **62 / 80** | **77.5 %** |

## Limitations

1. Built-up area is not the number of buildings. Vertical growth (extra floors) is not visible from above.
2. The lost class performed poorly (40 % in this sample). Treat lost candidates as unverified until each one is checked against high-resolution imagery.
3. The raw built-up difference in the camp (−11,306 m², −8.2 %) is mostly not confirmed by the v2 filters. The confirmed change (new 1,498 m² minus lost 1,372 m²) is almost balanced. Report the confirmed figures.
4. Built-up share in the camp (48.4 %) is high compared with the 20–35 % range noted in the notebook. Bright limestone, levelled ground or other classes may still be included.
5. Parallax (different viewing angles), remaining shadows, and the different native resolutions (1.02 m vs 0.51 m) can still cause errors.
6. The accuracy check was done by visual inspection by Luyao, on 80 points, and is subjective.
7. The 10 m sensor test is a simple aggregation of the 1 m map. About 52 % of new area lies in cells that are at least half new, and 64 % of the 166 new patches are smaller than one 10 m cell (median 65 m²). This indicates magnitude only.
8. Imagery shows that something changed, not who changed it or why.

## Outputs (`/content/outputs_v2`, downloaded as `outputs_v2.zip`)

- `image_2022-02-02.tif`, `image_2026-01-29.tif`: converted imagery
- `01_rgb_aligned.png`, `02_classes_2022-02-02.png`, `02d_each_class.png`, `02c_road_mask.png`: alignment, classes, road removal
- `03a_confirmed_change.png`, `03c_noise_removed.png`: main results
- `04_change_map_v2.png`, `change_v2_2022-02-02_2026-01-29.tif`: change map (0 = not built, 1 = stable built-up, 2 = new, 3 = lost candidate)
- `new_candidates.gpkg`, `lost_candidates.gpkg`: patches with IDs for checking in QGIS
- `grid_50m_change_v2.gpkg`, `05_grid_change_v2.png`: grid summary
- `06_before_after.png`, `check_points.gpkg`, `check_page_*.png`: before/after figure and accuracy check chips
- `stats_v2.csv`, `accuracy_check.csv`: tables

## How to reproduce

1. Open the notebook in Google Colab.
2. Upload the four input files to `/content/fawwar`.
3. Check the camp boundary plot, `BUILT_CLUSTERS` and `WRONG_IDS`. `WRONG_IDS` belongs to this run only; if inputs or parameters change, the sample changes and the IDs must be checked again.
4. Run all cells. Download `outputs_v2.zip` and copy it to Google Drive, because Colab deletes files when the runtime disconnects.
