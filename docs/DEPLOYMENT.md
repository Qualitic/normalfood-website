# normalfood.qualitic.pl

The existing host is the `foodflow` SSH alias (`192.168.100.162`, user `kuba`).
Only Compose project `normalfood`, service `web`, container `normalfood-web-1`
and port `192.168.100.162:8081` belong to this website. The Cloudflare route and
FoodFlow's containers, database and settings are independent and stay untouched.

The approved home page is implemented in `src/pages/index.astro`,
`src/styles/home.css` and `src/scripts/home.js`, using local licensed fonts and
Normal Food assets under `public/normalfood`. Existing routes remain available.
Ordering links use `src/config/foodflow.ts`, including optional per-diet URLs;
canonical and sitemap URLs use `PUBLIC_SITE_URL`. No Sites identity, private
preview address or browser credentials are copied into this repository.

## Prepare and verify

```powershell
npm ci
npm run check
npm run build
$env:NORMALFOOD_PREVIEW_PORT = '4325' # optional isolated local port
npm run test:e2e
git diff --check
```

Screenshots, test traces and raw deployment output belong to ignored `.artifacts/`.
Tests cover the existing routes, SEO, ordering links, menu, keyboard navigation,
no-JavaScript fallback, accessibility, and the approved two-line hero at
320/390/768/1440 px. Mobile checks use Chromium emulation, not physical devices.

## Publish an exact source commit

After committing and pushing the source, create a `git archive` of that full SHA.
Transfer it to `/home/kuba/normalfood-releases/<full-sha>/source.tar`, compare its
SHA-256 locally and remotely, then extract it in that same release directory.
Do not overwrite `/home/kuba/normalfood-website`, its untracked deployment files,
or its `.env`. The isolated release reuses that existing environment file through
Compose `--env-file`. Its values are currently:

```text
PUBLIC_SITE_URL=https://normalfood.qualitic.pl
PUBLIC_FOODFLOW_ORDER_URL=https://foodflow.qualitic.pl
```

Run from the verified release directory:

```sh
bash scripts/deploy-normalfood.sh <full-sha>
```

The script tags the running image for rollback, builds the new image tagged with
the source SHA, validates Nginx, and only then recreates the website container.
It checks local HTTP readiness and the image's OCI source-revision label. An
error after cutover restores the previous image. Previous images, source files
and releases remain available; there is no recursive cleanup.

Verify the actual public HTTPS address after deployment: correct hero and images,
ordering destination, canonical URL, original subpages, unknown-route HTTP 404,
desktop/mobile layout, and browser errors. Record the source SHA, image IDs,
rollback tag, results and screenshots under `.artifacts/`.

## Manual rollback

Inside the release directory, restore the image tag prepared by the script:

```sh
SOURCE_REVISION=rollback-<full-sha> docker compose -p normalfood \
  --env-file /home/kuba/normalfood-website/.env -f compose.yaml \
  up -d --no-deps --no-build web
```

This restores only the website. No schema migration, FoodFlow restart, DNS,
tunnel, payment or email change is part of this deployment.
