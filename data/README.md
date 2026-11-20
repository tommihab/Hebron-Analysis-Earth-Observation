# Data storage and access

- `raw/`: original downloaded datasets (not committed to GitHub).
- `processed/`: derived rasters/vectors (not committed to GitHub by default).
- `reference/`: lightweight AOI boundaries and validation samples only when licenses permit.

For every dataset, update `../metadata/data_sources.csv` with the provider, acquisition date, resolution, CRS, URL, reuse conditions and processing details. Add exact download/export steps here so another person can reproduce the workflow.

Do not assume that publicly viewable imagery can legally be redistributed.
