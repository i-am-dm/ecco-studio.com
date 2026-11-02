#!/usr/bin/env bash
# Runs only after separately approved release execution. Never prints the token.
set -euo pipefail
test "${EXPECTED_IMAGE_ID:?}" = "$(docker image inspect local/ecco-studio-ci:validation --format '{{.Id}}')"
image_ref=us-central1-docker.pkg.dev/packpilot-461918/cloud-run-source-deploy/ecco-studio-web-security:c1f50400c9eddf14
config_dir=$(mktemp -d "${RUNNER_TEMP:?}/ecco-registry-auth.XXXXXX")
cleanup() {
  docker --config "$config_dir" logout us-central1-docker.pkg.dev >/dev/null 2>&1 || true
  rm -rf -- "$config_dir"
}
trap cleanup EXIT
printf '%s' "${REGISTRY_ACCESS_TOKEN:?}" | docker --config "$config_dir" login -u oauth2accesstoken --password-stdin us-central1-docker.pkg.dev
docker tag "$EXPECTED_IMAGE_ID" "$image_ref"
docker --config "$config_dir" push "$image_ref" | tee "$RUNNER_TEMP/ecco-push.log"
python3 - <<'PY'
import json, os, pathlib, re
text=(pathlib.Path(os.environ['RUNNER_TEMP'])/'ecco-push.log').read_text()
digests=re.findall(r'digest: (sha256:[0-9a-f]{64})',text)
assert len(set(digests))==1, 'Expected one registry manifest digest'
print(json.dumps({'source_commit':'c1f50400c9eddf14f0ef4b61d2067a1da1c18df2','image_id':os.environ['EXPECTED_IMAGE_ID'],'registry_image':'us-central1-docker.pkg.dev/packpilot-461918/cloud-run-source-deploy/ecco-studio-web-security@'+digests[0]}))
PY
