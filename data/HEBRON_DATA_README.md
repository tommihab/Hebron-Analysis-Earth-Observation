# Hebron data references

No large source rasters are distributed in this starter pack.

## Study boundary

Google Earth Engine asset in the built-up script: `projects/geohum-action/assets/hebron_aoi`. Other users require appropriate asset permissions. Where allowed, a transferable AOI GeoJSON or GeoPackage can be added under `data/reference/` with its own metadata, CRS and provenance.

## Earth Engine source collections

- Built-up: `GOOGLE/DYNAMICWORLD/V1`, band `built`.
- Vegetation: Sentinel-2 Level-2A and ESA WorldCover 2020 (exact vegetation script collection IDs to verify when full code is supplied).

See `metadata/hebron_data_sources.csv` and the workflow/methodology documentation for source links and specifications.

## Exported data

The built-up script configures five GeoTIFF exports to the user's Google Drive folder `GEE_Hebron`. Download/export actual results separately, and document filenames, creation dates, size, provenance, units and quality checks before committing or citing them. Use external storage for large outputs where appropriate and confirm source licensing and collaborators' permission to access data.
