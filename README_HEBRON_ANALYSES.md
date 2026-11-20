# Hebron regional land-cover analyses — documentation index

This package adds documentation and supplied code to an **existing** project repository without replacing its root README or other existing files.

| Topic | File |
| --- | --- |
| Built-up GEE JavaScript | [`code/gee/hebron_builtup_change.js`](code/gee/hebron_builtup_change.js) |
| GEE script notes / missing vegetation script | [`code/gee/README.md`](code/gee/README.md) |
| Built-up method, parameters and caveats | [`docs/methodology/hebron_builtup_change.md`](docs/methodology/hebron_builtup_change.md) |
| Vegetation method summary | [`docs/methodology/hebron_vegetation_change.md`](docs/methodology/hebron_vegetation_change.md) |
| Two-method workflow | [`docs/workflows/hebron_landcover_workflow.md`](docs/workflows/hebron_landcover_workflow.md) |
| Source inventory | [`metadata/hebron_data_sources.csv`](metadata/hebron_data_sources.csv) |
| Parameter inventory | [`metadata/hebron_analysis_parameters.csv`](metadata/hebron_analysis_parameters.csv) |
| Data access notes | [`data/HEBRON_DATA_README.md`](data/HEBRON_DATA_README.md) |
| Built-up results placeholder | [`results/builtup/README.md`](results/builtup/README.md) |
| Vegetation results placeholder | [`results/vegetation/README.md`](results/vegetation/README.md) |
| Validation plan | [`experiments/hebron_validation_plan.md`](experiments/hebron_validation_plan.md) |

## Status and language

- **Built-up:** The complete Earth Engine script was supplied; it is preserved as provided and its behaviour documented. Execution, raster outputs and validation were not performed or inspected in this documentation step.
- **Vegetation:** Only a methodology excerpt was supplied, **not executable JavaScript**. The excerpt's parameters have been documented, and missing implementation details are marked for verification.
- Report both as **potential** change until independent evidence supports stronger claims.

## Add to the main repository README

Add this Markdown line to the existing root `README.md`:

`[Hebron regional change analyses](README_HEBRON_ANALYSES.md)`
