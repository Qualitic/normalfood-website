#!/usr/bin/env bash
# Run on the existing NormalFood host, inside an extracted, verified git archive.
set -Eeuo pipefail

revision=${1:?Expected full source commit SHA}
[[ $revision =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid source revision' >&2; exit 1; }
release="/home/kuba/normalfood-releases/$revision"
[[ $(pwd -P) == "$release" ]] || { echo 'Unexpected release directory' >&2; exit 1; }
settings=/home/kuba/normalfood-website/.env
[[ -f $settings && -f compose.yaml && -f Dockerfile ]] || { echo 'Missing deployment inputs' >&2; exit 1; }
export SOURCE_REVISION="$revision"

previous_image=$(docker inspect normalfood-web-1 --format '{{.Image}}')
rollback_tag="normalfood-web:rollback-$revision"
docker image tag "$previous_image" "$rollback_tag"
mkdir -p .deployment
printf '%s\n' "$previous_image" > .deployment/previous-image.txt

compose() { docker compose -p normalfood --env-file "$settings" -f "$release/compose.yaml" "$@"; }
# Build and validate while the previous website continues serving.
compose build web
docker run --rm --entrypoint nginx "normalfood-web:$revision" -t

rollback() {
  trap - ERR
  echo 'Deployment failed; restoring the previous website image' >&2
  SOURCE_REVISION="rollback-$revision" compose up -d --no-deps --no-build web
}
trap rollback ERR
compose up -d --no-deps --no-build web

ready=false
for attempt in {1..15}; do
  if curl --fail --silent --max-time 5 http://192.168.100.162:8081/ -o /dev/null; then ready=true; break; fi
  sleep 1
done
[[ $ready == true ]]
actual_revision=$(docker inspect normalfood-web-1 --format '{{index .Config.Labels "org.opencontainers.image.revision"}}')
[[ $actual_revision == "$revision" ]]
docker exec normalfood-web-1 sh -c 'test -f /usr/share/nginx/html/normalfood/schabowy.webp && test -f /usr/share/nginx/html/menu/index.html'
trap - ERR
printf '%s\n' "$revision" > .deployment/deployed-revision.txt
printf 'DEPLOYED %s\nROLLBACK_IMAGE %s\n' "$revision" "$previous_image"
