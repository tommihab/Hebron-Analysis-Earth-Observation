"""Local, model-free unit tests for unverified helper proposals."""
import importlib.util
from pathlib import Path
import numpy as np

SCRIPT = Path(__file__).resolve().parents[1] / 'code/orthophotos/inference_helpers.py'
spec = importlib.util.spec_from_file_location('orthophoto_helpers', SCRIPT)
helpers = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helpers)


def test_window_positions_cover_edges():
    pos = helpers.get_window_positions(3334, 256, 192)
    assert pos[0] == 0
    assert pos[-1] == 3334 - 256
    assert all(b > a for a, b in zip(pos, pos[1:]))


def test_preprocessing_shape_and_dtype():
    img = np.zeros((256, 256, 3), dtype=np.uint8)
    arr = helpers.preprocess_window(img)
    assert arr.shape == (1, 3, 256, 256)
    assert arr.dtype == np.float32
    assert np.isfinite(arr).all()


def test_output_requires_explicit_kind():
    vals = np.zeros((256,256), dtype=np.float32)
    assert np.allclose(helpers.output_to_probability(vals, kind='logits'), 0.5)
    assert np.allclose(helpers.output_to_probability(vals, kind='probabilities'), 0.0)
