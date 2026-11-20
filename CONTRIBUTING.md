# Group collaboration guidelines

1. Open an Issue or tell the group before major changes to shared datasets or methods.
2. For nontrivial changes, work on a separate branch (e.g., `feature/sentinel2-composites`) and open a Pull Request for review.
3. Use clear commit messages, such as `Add vegetation-change notebook`.
4. Do not commit passwords, authentication tokens, private personal data, or datasets whose licenses do not permit redistribution.
5. Keep large rasters and model weights outside GitHub; document their access and version in `metadata/data_sources.csv`.
6. Keep notebooks reproducible: note input data, parameters, environment, outputs, and random seeds where relevant.
7. Record failed or rejected approaches in `experiments/experiment_log.csv`, including the reason for rejection.
8. Treat any map or change estimate as provisional until its validation and limitations are documented.
