#!/usr/bin/env bash
set -euo pipefail
suite_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
source_root=${GITHUB_WORKSPACE:?}
validation_root=${RUNNER_TEMP:?}/ecco-native-validation
receipts=$validation_root/receipts
test "$(uname -m)" = x86_64
test -z "${DOCKER_HOST:-}"
test "${DOCKER_CONTEXT:-default}" = default
test "$(docker context show)" = default
test "$(git -C "$source_root" rev-parse HEAD)" = "${EXPECTED_SHA:?}"
test "${GITHUB_REF:?}" = refs/heads/security/ecco-native-validation-20261102
mkdir -p "$receipts"
docker info --format '{{.OSType}}/{{.Architecture}}' | tee "$receipts/docker-host.txt"
test "$(docker info --format '{{.OSType}}/{{.Architecture}}')" = linux/x86_64
python3 "$suite_dir/prepare-context.py" "$source_root" "$validation_root/app" | tee "$receipts/source-identity.json"
cmp "$suite_dir/check-system-ca.mjs" "$validation_root/app/scripts/check-system-ca.mjs"

# No login, credentials, secret mounts, build args, image pushes or emulation.
timeout --signal=TERM --kill-after=15s 12m docker build \
  --pull --no-cache --platform linux/amd64 --progress=plain \
  -t local/ecco-studio-ci:validation "$validation_root/app"
image_id=$(docker image inspect local/ecco-studio-ci:validation --format '{{.Id}}')
timeout --signal=TERM --kill-after=15s 3m bash "$suite_dir/run-studio-image-checks.sh" "$image_id" "$receipts/image"

cp -a "$validation_root/app" "$validation_root/filter-probe"
mkdir -p "$validation_root/filter-probe/validation-data"
for relative in gha-creds-validation.json application_default_credentials.json validation-data/gha-creds-validation.json validation-data/application_default_credentials.json validation-data/settings.json; do
  printf '{}\n' > "$validation_root/filter-probe/$relative"
done
timeout --signal=TERM --kill-after=15s 1m docker build \
  --network none --pull=false --no-cache --platform linux/amd64 --progress=plain \
  --build-arg VALIDATED_IMAGE=local/ecco-studio-ci:validation \
  -f "$suite_dir/context-filter.Dockerfile" \
  -t local/ecco-studio-ci:context-filter "$validation_root/filter-probe"
test "$(docker image inspect local/ecco-studio-ci:validation --format '{{.Id}}')" = "$image_id"
printf 'PASS: actual Docker filtering excludes four synthetic auth files and preserves source/ordinary JSON\n' > "$receipts/context-filter.txt"
printf 'PASS: native Linux image build and all prepared Ecco checks\n' > "$receipts/result.txt"
