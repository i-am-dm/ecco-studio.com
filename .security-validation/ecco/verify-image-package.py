#!/usr/bin/env python3
import hashlib, json, os, pathlib
root=pathlib.Path(os.environ['RUNNER_TEMP'])/'ecco-release-package'
m=json.loads((root/'image-metadata.json').read_text())
assert m['source_commit']=='c1f50400c9eddf14f0ef4b61d2067a1da1c18df2'
assert m['source_tree']=='37170083111f5be3faae67a835b19b5caddcc2f5'
raw=(root/'image.tar.gz').read_bytes()
assert len(raw)==m['archive_bytes'] and len(raw)<=1073741824
assert hashlib.sha256(raw).hexdigest()==m['archive_sha256']==os.environ['EXPECTED_ARCHIVE_SHA256']
assert m['image_id']==os.environ['EXPECTED_IMAGE_ID']
print('PASS: downloaded image package matches successful native build job and immutable release source')
