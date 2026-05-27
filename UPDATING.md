# Updating the upstream version

This package builds a custom Docker image from the official Calibre standalone Linux tarball, pinned to a specific version.

## Determining the upstream version

Check the latest Calibre release on GitHub:

```sh
gh release view -R kovidgoyal/calibre --json tagName -q .tagName
```

The current pin is the `CALIBRE_VERSION` build arg in `Dockerfile` (e.g. `9.8.0`).

## Applying the bump

1. Update `ARG CALIBRE_VERSION=<new version>` in `Dockerfile`.
2. Update `version` in `startos/versions/current.ts` to `<new version>:0` and update `releaseNotes`.
3. Verify the new release has the expected tarball names:
   - `calibre-<version>-x86_64.txz`
   - `calibre-<version>-arm64.txz`
