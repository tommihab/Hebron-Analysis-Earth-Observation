# Experiment log — High-resolution building segmentation

| Experiment | Description in available sources | Outcome or status | Traceability |
|---|---|---|---|
| 15 cm vs 30 cm | Test patch downsampling and predicted-mask comparisons | 30 cm used in full-AOI analysis | Notebook cells 8–13; no independent accuracy comparison provided |
| Probability thresholds | Tests 0.20, 0.30, 0.40, 0.4371 and 0.50 | 0.30 used in full-AOI analysis | Notebook cell 11; selected value is not validated against labels |
| SIFT + RANSAC registration | Previously reported test of inter-year orthophoto alignment | No clear improvement; correction was not applied | **Not included in submitted notebook**; add original test code, matching statistics, and rationale when available |
| ONNX output/preprocessing audit | Check which preprocessing and postprocessing are expected by model | **Not yet verified in submitted notebook** | Missing functions and `expit` output ambiguity noted in code review |
| Manual validation | Sample buildings in each year and inspect gain/loss areas | Not provided | Should be added before claiming confirmed change |

Document future trials with the date, parameter set, model revision, data source version, metrics, observed outcome and decision to include/reject the approach.
