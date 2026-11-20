"""Inspect raster grid metadata of annual orthophoto GeoTIFFs.

Helper created for repository documentation; NOT extracted from the original Colab notebook.

Usage:
    python code/preprocessing/check_orthophoto_grids.py path/2021.tif path/2022.tif path/2023.tif

Requires rasterio: pip install rasterio
This does not establish subpixel co-registration; it only compares grid metadata.
"""

import sys
from pathlib import Path


def main(paths):
    try:
        import rasterio
    except ImportError as exc:
        raise SystemExit("Install rasterio (pip install rasterio) before running this check") from exc
    if not paths:
        raise SystemExit("Pass two or more GeoTIFF paths as arguments")

    grids = []
    for raw_path in paths:
        path = Path(raw_path)
        if not path.exists():
            raise SystemExit(f"Missing file: {path}")
        with rasterio.open(path) as ds:
            grid = (str(ds.crs), ds.width, ds.height, tuple(ds.transform))
            print(f"\n{path}")
            print(f"  CRS: {ds.crs}")
            print(f"  shape: {ds.width} × {ds.height}; bands: {ds.count}")
            print(f"  pixel sizes: {ds.res}")
            print(f"  bounds: {ds.bounds}")
            print(f"  transform: {ds.transform}")
            grids.append((path, grid))

    base_path, base_grid = grids[0]
    for path, grid in grids[1:]:
        print(f"Grid of {path.name} matches {base_path.name}: {grid == base_grid}")
    print("Reminder: matching grids do not establish accurate image-to-image registration.")


if __name__ == "__main__":
    main(sys.argv[1:])
