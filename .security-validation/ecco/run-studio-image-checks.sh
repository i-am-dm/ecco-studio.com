#!/usr/bin/env bash
# Prepared only. Run on the centrally approved disposable Linux Docker host.
# This checks an already-built image; it does not build, pull, publish or deploy.
set -euo pipefail
if [ "$#" -ne 2 ]; then
  echo 'Usage: bash run-studio-image-checks.sh EXISTING_IMAGE_REF RECEIPT_DIRECTORY' >&2
  exit 2
fi
image_ref=$1
receipts=$2
validation_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
mkdir -p -- "$receipts"
image_id=$(docker image inspect "$image_ref" --format '{{.Id}}')
test "$(docker image inspect "$image_id" --format '{{.Os}}/{{.Architecture}}')" = linux/amd64
docker image inspect "$image_id" --format '{{.Id}} {{.Os}}/{{.Architecture}}' > "$receipts/image-identity.txt"
run_check() {
  local receipt=$1
  shift
  docker run --rm --pull=never --platform linux/amd64 --network none \
    --mount "type=bind,src=$validation_dir,dst=/validation,readonly" \
    --entrypoint "$1" "$image_id" "${@:2}" 2>&1 | tee "$receipts/$receipt"
}
run_check runtime.txt node -e '
const a=require("node:assert/strict");
a.equal(process.platform,"linux"); a.equal(process.arch,"x64"); a.equal(process.version,"v22.23.4");
for (const n of ["react","react-dom"]) a.equal(require(n+"/package.json").version,"18.3.1");
console.log(JSON.stringify({node:process.version,platform:process.platform,architecture:process.arch}));'
run_check system-ca.txt sh -ec '
dpkg-query -W ca-certificates
sha256sum /etc/ssl/certs/ca-certificates.crt
node /validation/check-system-ca.mjs /etc/ssl/certs/ca-certificates.crt'
run_check ca-regressions.json node /validation/check-ca-regressions.mjs /validation/check-system-ca.mjs /validation/fixtures
run_check tls.txt node --expose-internals /validation/tls-blocklist.cjs
run_check http.txt node /validation/http-smoke.mjs /app/
run_check generated-auth-files.txt sh -ec '
found=$(find / -path /proc -prune -o -path /sys -prune -o -path /dev -prune -o -path /validation -prune -o -type f \( -name "gha-creds-*.json" -o -name application_default_credentials.json \) -print)
test -z "$found"
echo "PASS: no generated-auth or ADC files in final-image filesystem"'
echo 'PASS: Studio final-image runtime, system CA, 11 CA cases, TLS, HTTP and auth-file checks'
echo 'SEPARATE GATES: actual Docker context filtering with synthetic sentinels; approved browser/review revision; production release'
