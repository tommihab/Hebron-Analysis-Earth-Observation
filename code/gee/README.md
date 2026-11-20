# Google Earth Engine workflows — Hebron

## Built-up change

- **Executable script:** [`hebron_builtup_change.js`](hebron_builtup_change.js)
- **Source:** Full JavaScript supplied by the project team (preserved without substantive code changes).
- **Method:** Dynamic World `built` class probability; mean June–September composites for 2020, 2021, 2022 and 2026; comparison of 2020–2022 baseline against 2026.
- **Instructions:** In the [Earth Engine Code Editor](https://code.earthengine.google.com/), paste the script, check access to the AOI asset, click Run, inspect the map and start exports from **Tasks**.
- **Dependencies:** Google Earth Engine access, `GOOGLE/DYNAMICWORLD/V1`, and access to the asset `projects/geohum-action/assets/hebron_aoi`.
- **Outputs:** Five named GeoTIFF exports to Google Drive folder `GEE_Hebron`.

## Vegetation change

A summary of the vegetation methodology is supplied in [`../../docs/methodology/hebron_vegetation_change.md`](../../docs/methodology/hebron_vegetation_change.md). **The full executable vegetation JavaScript has not yet been supplied**, so there is intentionally no `.js` script here. Add it after checking that the code matches the documented settings.

The analyses should be presented as **potential**, not independently confirmed, built-up or vegetation change.

## Run instructions

1. Open the [Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Paste the JavaScript from this folder into a new script, or open the associated Earth Engine script link if available.
3. Make sure Earth Engine access is enabled and the AOI geometry used by the script is accessible.
4. Execute the script. If the script contains `Export` tasks, start them in the Tasks panel.
5. Save output maps/tables in the appropriate results folders; document export dates, spatial reference, scale, and processing settings.
