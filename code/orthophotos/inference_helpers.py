"""Candidate helpers missing in the submitted Orthophoto Colab notebook.

IMPORTANT: This file has not been tested against the actual downloaded ONNX model.
Confirm the model's preprocessing and output semantics before relying on any
segmentation areas or change maps. It is *not* imported automatically by the
original notebook and intentionally does not modify the source analysis.

The normalization constants reflect the HOTOSM fAIr-models documentation
for dinov3s_buildings. Confirm that the specific HF ONNX export expects
this input contract (some self-contained exports include preprocessing).
https://github.com/hotosm/fAIr-models/blob/develop/models/dinov3s_buildings/README.md
"""
from __future__ import annotations
import numpy as np

# HOTOSM fAIr model training-data normalization (reference; verify ONNX contract)
RGB_MEAN = np.array([0.4297, 0.4002, 0.3433], dtype=np.float32)
RGB_STD = np.array([0.2056, 0.1674, 0.1599], dtype=np.float32)


def get_window_positions(length: int, window_size: int, stride: int) -> list[int]:
    """Start indices covering a whole axis, including the trailing edge."""
    if not 0 < window_size <= length:
        raise ValueError('The image dimension must be >= window_size > 0.')
    if stride < 1:
        raise ValueError('stride must be a positive integer.')
    positions = list(range(0, length - window_size + 1, stride))
    if positions[-1] != length - window_size:
        positions.append(length - window_size)
    return positions


def preprocess_window(rgb_window: np.ndarray) -> np.ndarray:
    """PROPOSED uint8 RGB -> normalized float32 NCHW tensor.

    Review against the exact ONNX export metadata/model pipeline before use.
    """
    if rgb_window.ndim != 3 or rgb_window.shape[-1] != 3:
        raise ValueError('Expected RGB array of shape (H, W, 3).')
    if rgb_window.dtype != np.uint8:
        raise TypeError('Expected uint8 RGB imagery, 0..255.')
    pixels = rgb_window.astype(np.float32) / 255.0
    pixels = (pixels - RGB_MEAN) / RGB_STD
    return np.ascontiguousarray(pixels.transpose(2, 0, 1)[None, ...])


def output_to_probability(raw_map: np.ndarray, *, kind: str) -> np.ndarray:
    """Convert a selected 2D ONNX output channel using an EXPLICIT contract.

    kind must be 'logits' or 'probabilities'. Do not guess from values alone.
    Verify selected output channel and shape with the actual ONNX model.
    """
    arr = np.asarray(raw_map, dtype=np.float32)
    if arr.ndim != 2:
        raise ValueError('Expected a selected 2D output map; check ONNX channel shape.')
    if kind == 'logits':
        # Stable sigmoid, without requiring SciPy.
        return np.where(arr >= 0, 1.0 / (1.0 + np.exp(-arr)),
                        np.exp(arr) / (1.0 + np.exp(arr))).astype(np.float32)
    if kind == 'probabilities':
        if np.any((arr < 0.0) | (arr > 1.0)):
            raise ValueError('Declared probabilities have values outside [0, 1].')
        return arr
    raise ValueError("Set kind explicitly to 'logits' or 'probabilities'.")
