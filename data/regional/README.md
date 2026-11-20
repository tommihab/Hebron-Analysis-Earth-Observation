# Regional data access

The following Earth Engine datasets provide the source imagery and classifications. Dataset IDs and URLs are catalogued in `metadata/regional_data_sources.csv`:

- `COPERNICUS/S2_SR_HARMONIZED` (Sentinel-2 L2A surface reflectance)
- `GOOGLE/DYNAMICWORLD/V1` (Dynamic World land-cover probabilities)
- `ESA/WorldCover/v100` (2020 static land-cover map)

The AOI boundary should be stored as a small, shareable GeoJSON (if permitted) and its geometry/provenance documented. If the JavaScript references a private Earth Engine asset, explain how another team member can obtain access or replace it.

Do not commit large raw satellite collections, private account credentials or restricted datasets to GitHub.
