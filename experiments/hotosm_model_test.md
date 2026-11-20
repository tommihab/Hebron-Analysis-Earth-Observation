# Experiment: HOTOSM DINOv3 building segmentation

**Status:** Exploratory; no validated results supplied.

## Purpose

Explore a pretrained RGB-image building segmentation model for annual GeoMOLG orthophotos in Khirbet al-Fakheit, rather than training a model from scratch.

## Model

- Repository: <https://huggingface.co/hotosm/dinov3s-buildings>
- Artifact: `model.onnx` (do **not** commit model weights to GitHub).
- Model type: DINOv3 ViT-S/16 with UperNet segmentation head.
- Model-card default inference: sliding window **256 px**, stride **192 px**, threshold **0.4371**.
- Model-card licence: CC-BY-4.0; DINOv3 backbone has separate licence conditions.

## Previously explored Colab steps (verify in notebook)

1. Prepare annual test patches at 1536 × 1536 pixels.
2. Optionally resample images from ~15 cm to ~30 cm for experimental inference.
3. Download ONNX model and initialise ONNX Runtime.
4. Run tiled inference and inspect probability masks.

## Evidence required for a result

- The notebook revision and successful execution details.
- Saved per-year predictions (not only a plotted screenshot).
- Overlay on each year’s original orthophoto.
- Georeferencing or image coordinate mapping for model outputs.
- Manual accuracy assessment: false positives, missed buildings and year-to-year consistency.

**No building gain/loss numbers should be reported from this experiment until those checks are complete.**
