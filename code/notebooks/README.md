# Google Colab notebooks — Khirbet al-Fakheit

## Add the actual notebook

Place the **existing, executed** Google Colab notebook at:

`code/notebooks/khirbet_al_fakheit_orthophotos.ipynb`

In Colab: **File → Download → Download .ipynb**, then upload that file to GitHub under `code/notebooks/`. Alternatively, if offered in your Colab interface, use **File → Save a copy in GitHub** and select this repository and path.

The notebook has **not** been reconstructed from notes. Please upload the actual notebook instead of replacing it with a newly written approximation.

## Before committing

1. Review the notebook for personal Google Drive paths, passwords, access tokens, signed URLs or other private material.
2. Avoid committing generated orthophotos, large arrays, binary model weights, and long image outputs embedded in notebook cells.
3. Use **Edit → Notebook settings → Omit code cell output when saving this notebook**, if appropriate, to keep `.ipynb` small (see [Colab FAQ](https://research.google.com/colaboratory/faq.html)).
4. Record required Python packages, ideally with versions or `pip freeze` from the environment where the notebook ran.
5. Explain all required inputs: GeoMOLG imagery and AOI, runtime folder path, model weights, and output folders.
6. Include the checkpoint identifier/revision for any externally downloaded ML model.

## Previously used Colab paths (verify in the actual notebook)

- Working directory: `/content/orthophotos`
- Test patches: `/content/orthophotos/test_patches`
- Patch size: 1536 × 1536 px
- Possible patch names: `Patch_2021.png`, `Patch_2022.png`, `Patch_2023.png`

These are temporary Colab runtime paths, **not permanent data storage locations**. Upload or archive derived outputs outside the ephemeral runtime as appropriate.

## Reuse

A GitHub-hosted `.ipynb` can be opened in Google Colab. Rerunning requires the documented data sources, sufficient resources and the correct Python dependencies. The original downloaded imagery and Colab virtual machine are **not** included automatically.
