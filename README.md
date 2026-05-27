<p align="center">
  <img src="icon.svg" alt="Calibre Content Server Logo" width="21%">
</p>

# Calibre Content Server on StartOS

> **Upstream repo:** <https://github.com/kovidgoyal/calibre>

Calibre Content Server is the built-in web server from Calibre, the most popular open-source ebook manager. Browse your library, read books in the browser, upload new titles, and connect any OPDS-compatible reading app — all hosted on your own node.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                               |
| ------------- | --------------------------------------------------- |
| Image         | Custom Dockerfile (`debian:bookworm-slim` + calibre) |
| Calibre version | 9.8.0                                             |
| Architectures | x86_64, aarch64                                     |
| Entrypoint    | `/opt/calibre/calibre-server`                       |

The image is built from `debian:bookworm-slim`. The calibre standalone tarball is downloaded from the [official GitHub releases](https://github.com/kovidgoyal/calibre/releases) and extracted to `/opt/calibre`. This gives the full calibre suite (including `ebook-convert` and `calibre-debug`) without the desktop/VNC stack present in `linuxserver/calibre`.

---

## Volume and Data Layout

| Volume  | Mount Point | Purpose                                        |
| ------- | ----------- | ---------------------------------------------- |
| `main`  | `/config`   | User database (`users.db`), server state       |
| `books` | `/library`  | Calibre library (metadata.db + book files)     |

---

## Installation and First-Run Flow

1. On install, a random 22-character admin password is generated and saved to `main/store.json`.
2. A critical task notification appears prompting you to run **Get Admin Credentials** to retrieve your login.
3. On first start, a oneshot uses `calibre-debug` to create the `admin` user in `main/users.db` if it does not already exist.
4. `calibre-server` starts, serves the library at `/library` on port 8080, and marks itself ready once the port is listening.

An empty library is created automatically by calibre-server if none exists yet.

---

## Configuration Management

No StartOS-managed config file. All server configuration is passed as CLI flags at startup:

```
calibre-server --port=8080 --enable-auth --userdb=/config/users.db /library
```

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                         |
| --------- | ---- | -------- | ------------------------------- |
| Web UI    | 8080 | HTTP     | Calibre Content Server web UI   |

The same port also serves the OPDS catalog at `/opds`. Connect any OPDS-compatible app (KOreader, Moon+ Reader, etc.) to your node's URL with path `/opds`.

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

| Action                  | Status Filter | Description                                        |
| ----------------------- | ------------- | -------------------------------------------------- |
| Get Admin Credentials   | Any           | Returns the `admin` username and generated password |

---

## Backups and Restore

**Included in backup:**

- `main` volume (user database, store)
- `books` volume (the entire Calibre library)

**Restore behavior:** Both volumes are fully restored before the service starts. The admin password and library are preserved across restores.

---

## Health Checks

| Check         | Method                   | Messages                                                                         |
| ------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Web Interface | Port listening (8080)    | Success: "The web interface is ready" / Error: "The web interface is not ready"  |

---

## Dependencies

None.

---

## Limitations and Differences

1. **No GUI library management** — the Calibre desktop GUI is not available. Books are managed via the web upload interface or by connecting the Calibre desktop app to the server using its "Connect/Share" feature.
2. **Single admin user** — only the `admin` user is created automatically. Additional users can be added by running `calibre-server --manage-users` on the node directly.
3. **No riscv64** — the upstream calibre project does not publish a riscv64 binary release.

---

## What Is Unchanged from Upstream

`calibre-server` runs unmodified. No patches are applied. The only difference from running calibre-server manually is that authentication is enabled by default and the admin password is managed by StartOS.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: calibre-content-server
image: custom Dockerfile (debian:bookworm-slim + calibre 9.8.0 tarball)
architectures: [x86_64, aarch64]
volumes:
  main: /config       # users.db, store.json
  books: /library     # Calibre library (metadata.db + book files)
ports:
  ui: 8080            # web UI + OPDS at /opds
dependencies: none
auth: enabled, admin user created on first start via calibre-debug
actions:
  get-admin-credentials: returns admin username and password
startos_managed_env_vars: none
```
