# Khirbet al-Fakheit — Google Colab notebook

Notebook: `khirbet_al_fakheit_orthophotos.ipynb` (submitted source, cell outputs cleared).

## How to use

1. Open the `.ipynb` file in Google Colab.
2. Review service URLs and source permissions; use a persistent output directory if you want to keep data after the Colab session closes. The notebook currently writes files into `/content/orthophotos`.
3. Before attempting inference, resolve the two **undefined functions** documented below (see `../orthophotos/inference_helpers.py` for proposed code).
4. Verify the ONNX input normalisation and whether the selected output is **logits or probabilities**; the original notebook blindly runs `scipy.special.expit` on `logits[0, 0]`.
5. Pin and record the actual downloaded model commit SHA. The notebook obtains it via `HfApi().model_info(MODEL_ID).sha` but the cleared outputs do not preserve the resulting value.
6. Run the notebook sequentially, and save generated GeoTIFFs and summary CSVs in long-lived storage outside GitHub.
7. Independently validate samples of predicted buildings and apparent changes before treating the estimates as verified findings.

## Known issues in the supplied notebook

- `get_window_positions()` is referenced in the inference cell but missing from the notebook.
- `preprocess_window()` is referenced in the inference cell but missing from the notebook.
- The ONNX output transformation `expit(logits[0, 0])` is not independently verified against the downloaded model's actual output contract. Applying sigmoid twice or selecting the wrong channel would alter results.
- The notebook installs some requirements but does not explicitly install `opencv-python-headless`, `scipy` or `tqdm`, which are imported later; Colab may happen to include them.
- 2021/2022/2023 values in the final two charts are fixed Python lists, not dynamically drawn from `df_full_segmentation` / `df_change`.
- The SIFT/RANSAC registration assessment discussed in project notes **does not occur in the supplied notebook**. Record the separate script/notebook if it is available; otherwise describe it only as a reported external test.
- The script creates consistent nominal raster grids but does not prove pixel-level co-registration of scene content across dates. Apparent change may reflect image misalignment or viewpoint differences.
- GeoMOLG service availability and dataset reuse conditions may change. Capture retrieval dates if re-running.

## Dependencies mentioned in source

`requests`, `numpy`, `pandas`, `geopandas`, `rasterio`, `matplotlib`, `pyproj`, `shapely`, `Pillow`, `opencv-python`, `torch`, `onnxruntime`/`onnxruntime-gpu`, `huggingface_hub`, `scipy`, `tqdm`.

Use the existing repository `requirements.txt` as the canonical dependency list after reconciling it with your group's other scripts. Avoid overwriting it with this subproject-specific list.

## Reproducing plotted numbers

The two final bar-chart cells provide fixed values; cross-check them against the freshly computed `df_full_segmentation` and `df_change` after resolving the inference blocker. See `results/khirbet_orthophoto/statistics/` for a labelled transcription.
