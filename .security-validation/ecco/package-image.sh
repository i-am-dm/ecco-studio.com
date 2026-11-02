#!/usr/bin/env bash
set -euo pipefail
test "${RELEASE_SOURCE_COMMIT:?}" = c1f50400c9eddf14f0ef4b61d2067a1da1c18df2
test "$(git rev-parse HEAD^)" = "$RELEASE_SOURCE_COMMIT"
test "$(git rev-parse "$RELEASE_SOURCE_COMMIT^{tree}")" = 37170083111f5be3faae67a835b19b5caddcc2f5
package_dir=${RUNNER_TEMP:?}/ecco-release-package
mkdir -p "$package_dir"
test "$(docker image inspect local/ecco-studio-ci:validation --format '{{.Size}}')" -le 1073741824
docker save local/ecco-studio-ci:validation | gzip -1n > "$package_dir/image.tar.gz"
test "$(stat -c %s "$package_dir/image.tar.gz")" -le 1073741824
docker image inspect local/ecco-studio-ci:validation --format '{{.Id}}' > "$package_dir/image-id.txt"
docker run --rm --pull=never --network none --entrypoint node local/ecco-studio-ci:validation -e '
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const root="/app/build",files=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else if(item.isFile()){const b=fs.readFileSync(p);files.push({path:"/"+path.relative(root,p),bytes:b.length,sha256:crypto.createHash("sha256").update(b).digest("hex")});}else throw Error("Unexpected build entry");}}
walk(root);console.log(JSON.stringify({files}));' > "$RUNNER_TEMP/ecco-native-validation/receipts/build-assets.json"
cp -a "$RUNNER_TEMP/ecco-native-validation/receipts" "$package_dir/receipts"
python3 - <<'PY'
import hashlib, json, os, pathlib
p=pathlib.Path(os.environ['RUNNER_TEMP'])/'ecco-release-package'
raw=(p/'image.tar.gz').read_bytes()
metadata={'source_commit':os.environ['RELEASE_SOURCE_COMMIT'],'source_tree':'37170083111f5be3faae67a835b19b5caddcc2f5','archive_sha256':hashlib.sha256(raw).hexdigest(),'archive_bytes':len(raw),'image_id':(p/'image-id.txt').read_text().strip()}
(p/'image-metadata.json').write_text(json.dumps(metadata,indent=2)+'\n')
assert sum(f.stat().st_size for f in p.rglob('*') if f.is_file())<=1073741824, 'Artifact package exceeds1GiB'
with open(os.environ['GITHUB_OUTPUT'],'a') as out:
    out.write('archive_sha256='+metadata['archive_sha256']+'\nimage_id='+metadata['image_id']+'\n')
print(json.dumps(metadata))
PY
