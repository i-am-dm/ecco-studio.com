#!/usr/bin/env python3
"""Publish bounded nonsecret test receipts to Actions logs, not artifacts."""
import hashlib
import json
import os
import pathlib

root = pathlib.Path(os.environ['RUNNER_TEMP']) / 'ecco-native-validation' / 'receipts'
receipts = []
remaining = 512 * 1024
if root.exists():
    for path in sorted(root.rglob('*')):
        if not path.is_file() or path.is_symlink() or path.suffix not in ('.txt', '.json'):
            continue
        raw = path.read_bytes()
        selected = raw[:min(64 * 1024, remaining)]
        remaining -= len(selected)
        receipts.append({'path': str(path.relative_to(root)), 'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(), 'truncated': len(selected) != len(raw), 'content': selected.decode('utf-8', errors='replace')})
        if remaining <= 0:
            break
print('BEGIN_ECCO_NATIVE_RECEIPTS')
print(json.dumps({'commit': os.environ.get('EXPECTED_SHA'), 'receipts': receipts, 'max_raw_receipt_bytes': 512 * 1024}, indent=2))
print('END_ECCO_NATIVE_RECEIPTS')
