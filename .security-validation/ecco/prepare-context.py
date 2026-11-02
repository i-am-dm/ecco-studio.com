#!/usr/bin/env python3
"""Copy only the 80 hash-verified reviewed application inputs into Docker context."""
import hashlib
import json
import pathlib
import sys

source = pathlib.Path(sys.argv[1]).resolve()
destination = pathlib.Path(sys.argv[2]).resolve()
manifest = json.loads(pathlib.Path(__file__).with_name('source-manifest.json').read_text())
assert manifest['file_count'] == len(manifest['files']) == 80
assert not destination.exists(), 'Context destination must be new'
verified = []
for entry in manifest['files']:
    relative = pathlib.PurePosixPath(entry['path'])
    assert not relative.is_absolute() and '..' not in relative.parts
    assert '.git' not in relative.parts and entry['git_mode'] in ('100644', '100755')
    path = source.joinpath(*relative.parts)
    assert path.is_file() and not path.is_symlink() and path.resolve().is_relative_to(source), entry['path']
    content = path.read_bytes()
    assert len(content) == entry['bytes'] and hashlib.sha256(content).hexdigest() == entry['sha256'], entry['path']
    verified.append((relative, content, entry['git_mode']))
assert len({str(path) for path, _, _ in verified}) == 80
destination.mkdir(parents=True)
for relative, content, mode in verified:
    path = destination.joinpath(*relative.parts)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)
    path.chmod(0o755 if mode == '100755' else 0o644)
print(json.dumps({'result': 'PASS', 'reviewed_files': len(verified), 'source_base': manifest['source_base'], 'patch_sha256': manifest['patch_sha256']}))
