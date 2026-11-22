# Fawwar – Input Data

This folder contains the input data for `fawwar_builtup_change_v2.ipynb` (see `code/notebooks/`). The notebook reads these files from `/content/fawwar` in Google Colab.

## Files

| File | Content | Source |
|---|---|---|
| `20220202_Fawwar.tpkx` | Esri Wayback imagery, acquired 2022-02-02 | Esri World Imagery (Wayback), https://livingatlas.arcgis.com/wayback/ |
| `20260129_Fawwar.tpkx` | Esri Wayback imagery, acquired 2026-01-29 | Esri World Imagery (Wayback), https://livingatlas.arcgis.com/wayback/ |
| `fawwar_camp_boundary.gpkg` | Camp boundary polygon of Al Fawwar Refugee Camp, 0.284 km², coordinate system EPSG:2039 (Israel TM Grid, metres) | Digitised manually in QGIS, referring to the camp's locality record from PCBS (Palestinian Central Bureau of Statistics, locality code 13502905) |
| `road_network_roads.geojson` | Road network, 145 segments, field `highway` gives the road type | Generated with the `road_network` pipeline of the PyGeoVision Python package (code in the notebook). Contains OpenStreetMap IDs |

## Imagery licence

Esri imagery is subject to Esri's terms of use. Check these terms before sharing the `.tpkx` files publicly.

## Obtaining the imagery

1. Open Esri Wayback at https://livingatlas.arcgis.com/wayback/.
2. Select the release that contains the acquisition date (2022-02-02 or 2026-01-29).
3. Check the exact acquisition date in the metadata pop-up. Use this date, not the release date.
4. Export the camp area as a tile package (`.tpkx`) at the most detailed available level.
5. Name the files `20220202_Fawwar.tpkx` and `20260129_Fawwar.tpkx`.

## Usage

1. Open `fawwar_builtup_change_v2.ipynb` in Google Colab.
2. Upload the four files above to `/content/fawwar`.
3. Run all cells. The script checks the imagery and boundary files at the start. The road file is read in step 9, so a missing road file is reported at that step.

Files in the Colab file panel are deleted when the runtime disconnects. Keep a copy in Google Drive.
