# Hebron built-up change 2020–2026: optical analysis (Sentinel-2)

**Optical team - Axcel · 856.114 GeoHumanitarian Action · Z_GIS–MSF West Bank hackathon (November 2026)**

This part of the repository detects **new and disappeared built-up land** in the Hebron area of interest (AOI, 674 km²) between 2020 and 2026, and checks **reported demolitions** against the imagery. It uses **optical data only** (Sentinel-2, 10 m), processed in Google Earth Engine from a Google Colab notebook.

Notebook: [`code/notebooks/hebron_change_detection_v3.ipynb`](code/notebooks/hebron_change_detection_v3.ipynb)

---

## Key results

| Result | Value |
|---|---|
| Built-up in 2020 (baseline) | 12,765 ha |
| **New built-up, confirmed 2021–2025** | **351 ha (+2.7%)** |
| of which on land bare in 2020 | 115 ha |
| New built-up per year (2021 → 2025) | 53, 51, 73, 65, **109** ha |
| New built-up 2026 (provisional, not yet confirmed) | 431 ha |
| Built-up disappeared 2022–2025 (clear signal) | 18.5 ha (+21.3 ha low confidence in dense town) |
| Reported demolitions checked | 4 sites: 2 *possible*, 2 *not visible at 10 m* |

Focus areas: Dura–Qilqis–Yatta +85.8 ha, Beit Ummar +35.8 ha (+5.1%, fastest relative growth), Masafer Yatta no measurable change (structures smaller than 10 m).

Comparison with existing products (Dynamic World): about 49% of built-up area overlaps; only 25% of our new built-up is also new in Dynamic World. For 2020–2025, the existing-products team found about 11% growth with land-cover products; this method gives 2.7%, because it only counts pixels that turn built-up **and stay built-up**.

---

## Data

| Dataset | Earth Engine ID | Use |
|---|---|---|
| Sentinel-2 L2A (harmonized) | `COPERNICUS/S2_SR_HARMONIZED` | All classification and change detection |
| Cloud Score+ | `GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED` | Cloud and haze mask (`cs_cdf >= 0.6`) |
| ESA WorldCover 2021 | `ESA/WorldCover/v200` | Training samples only |
| Dynamic World | `GOOGLE/DYNAMICWORLD/V1` | Training samples and comparison |
| VIDA building footprints (Google + Microsoft) | `projects/sat-io/open-datasets/VIDA_COMBINED/PSE` | Built-up samples only on mapped roofs |
| News and NGO reports | — | Dated incident sites (Part 2) |

**Not used:** radar (outside the optical team's brief), Landsat (30 m too coarse for single houses), and existing land-cover products as the final answer (they only select training samples).

---

## Method

1. **Images:** for every year 2020–2026, the clearest day in **spring (15 Mar–30 Apr)** and **summer (1 Jul–31 Aug)**; leftover cloud filled from the second-clearest day. Two images a year keep the run within the Earth Engine noncommercial quota.
2. **Features:** summer bands, NDVI, NDBI, BSI, brightness; spring indices; spring-minus-summer NDVI.
3. **Training samples:** 6,000 pixels from stable land where WorldCover and Dynamic World agree in both 2020 and 2026; built-up samples restricted to VIDA footprints.
4. **Classifier:** Random Forest, 100 trees, three classes (built-up, vegetation, bare); output is a built-up probability per pixel and year. Agreement with held-back samples: 0.91.
5. **Change rules:**
   - *New built-up (confirmed 2021–2025):* not built in 2020, built from a year on and in every later year, probability rise ≥ 0.35, patch ≥ 5 pixels.
   - *2026:* same rule with one year of evidence, kept as provisional.
   - *Built-up disappeared:* built in 2020 and 2021, persistent probability drop ≥ 0.35; low confidence in dense town.
6. **Reported incidents (Part 2):** sites uploaded as KMZ with a date in each placemark name; three checks per site (site-versus-ring t-test on BSI, local before/after change map, single-day image strip) and a verdict.
7. **Outputs:** areas counted at 10 m on downloaded rasters; GeoPackage, GeoTIFFs, CSV statistics, maps and GIFs.

---

## How to run

1. Open the notebook in **Google Colab**.
2. In the setup cell, set your own Earth Engine project ID in `ee.Initialize(project='...')`, then sign in when prompted.
3. Run the cells in order. Upload the AOI when asked (GeoJSON, GeoPackage, KML or KMZ).
4. For Part 2, upload a KMZ with one placemark per incident, named like `Site name | YYYY-MM-DD`.
5. Outputs are zipped and downloaded at the end (`hebron_change_detection_v3_outputs.zip`).

Settings (dates, thresholds, scale) are all in the `CONFIG` cell.

---

## Outputs

All rasters are EPSG:32636 (UTM 36N), 10 m; value 0 = outside AOI or no change.

| File | Content |
|---|---|
| `PSE_Hebron_S2_ChangeDetection_2020_2026.gpkg` | Vector layers: analysis extent, new built-up (confirmed and 2026), built-up disappeared, bare-to-built hotspots, reported places and incidents, validation points, focus-area statistics |
| `PSE_Hebron_S2_LandCover_YYYY.tif` | Land cover per year: 1 built-up, 2 vegetation, 3 bare |
| `PSE_Hebron_S2_NewBuiltup_Year_Confirmed_2021_2025.tif` | Year a pixel became built-up and stayed built-up |
| `PSE_Hebron_S2_NewBuiltup_2026_Provisional.tif` | 1 = new in 2026, not yet confirmed |
| `PSE_Hebron_S2_BuiltupDisappeared_Year.tif` / `_Confidence.tif` | Year of loss; 1 clear, 2 low confidence |
| `PSE_Hebron_S2_ResultsStack_2020_2026.tif` | All layers in one multiband file |
| `*.csv` | Statistics: new built-up per year, loss, focus areas, incidents, comparison with existing products |
| `*.png`, `*.gif` | Charts, incident figures, place zooms, time-lapse GIFs (new built-up in red) |

---

## Limitations

- **Resolution:** 10 m pixels miss single small houses, caravans, tents, added floors and damage without collapse.
- **Spectral confusion and seasonal variability:** stone houses look like bare limestone, and rainfall changes vegetation and bare soil from year to year.
- **2026 is provisional** until a 2027 image confirms it.
- **Accuracy not yet measured:** the validation points in the GeoPackage still need labelling against very-high-resolution imagery.
- **Attribution:** the layers show where land changed, not who built or demolished, or why.
