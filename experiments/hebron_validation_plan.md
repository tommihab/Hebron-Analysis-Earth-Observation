# Validation and sensitivity experiments — suggested plan

**Status:** This is a plan; no validation was reported in the provided scripts/excerpt.

## Built-up

- Review candidate expansion/reduction against permitted high-resolution imagery at representative locations.
- Inspect hard negatives: rocky areas, bare soil, dense shadows, roads and seasonal brightness changes.
- Test thresholds around the initial `0.20` and `0.50` values; test connected-pixel filtering and document differences.
- Audit the number of available Dynamic World observations per pixel and period.

## Vegetation

- Check whether candidate MSAVI2 decline corresponds to visually observable vegetation loss or seasonal change.
- Test threshold sensitivity and alternative cloud/shadow treatment after receiving the full script.
- Compare representative outputs with high-resolution imagery where temporally and legally suitable.

## Log template

| Experiment ID | Method / parameter | Objective | Outcome | Decision | Evidence / link |
| --- | --- | --- | --- | --- | --- |
| HB-001 | Built-up threshold sensitivity | Test stability of detected patches | PENDING | PENDING | PENDING |
| HV-001 | Vegetation false-positive review | Check crop/phenology confusion | PENDING | PENDING | PENDING |

Record negative/unsuccessful results, including what was tested, why it was rejected, and whether any code or map is archived.
