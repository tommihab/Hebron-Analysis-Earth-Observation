# Experiment: Cross-year geometric registration using SIFT and RANSAC

**Status:** Tested; global correction **not adopted**.

## Motivation

A building-change analysis can generate false positives when successive years' orthophotos are misaligned, even if they have the same nominal resolution and CRS.

## Procedure

Feature-based registration was tested between GeoMOLG annual orthophotos using SIFT feature matching and RANSAC geometric estimation. Results were compared with the original images to assess whether the transform improved alignment.

## Outcome and decision

The experiment did not show a sufficiently clear and consistent improvement. A previously noted assessment suggested that the attempted correction degraded the 2022 comparison and produced at most a modest improvement for 2023. Consequently, the original imagery geometry was retained.

## Limitations and follow-up

- Numerical feature-match counts, residuals and transformation parameters are **not documented here** and must be copied from the notebook if available.
- Rejecting the global correction does **not** demonstrate perfect alignment.
- Before detecting building change, assess local displacements at stable roofs, street corners and other identifiable controls.

This failed/abandoned approach should remain in the repository as part of the methodological audit trail.
