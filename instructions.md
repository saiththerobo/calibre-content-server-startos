# Calibre Content Server

Calibre Content Server lets you browse and read your ebook library from any browser, and connect reading apps on your phone or e-reader via OPDS.

## First-time setup

After installation, a critical notification will appear — click **Get Admin Credentials** to retrieve your username (`admin`) and generated password. You will need these to log in to the web interface.

## Accessing the library

1. Open the **Dashboard** tab.
2. Click **Web UI** to open the library in your browser.
3. Log in with the credentials from **Get Admin Credentials**.

## Adding books

You can add books directly from the web interface using the upload button. Supported formats include EPUB, MOBI, PDF, CBZ, and many others.

You can also connect the Calibre desktop app on your computer to this server via **Connect/Share → Connect to Calibre Content Server**, which gives you full library management (metadata editing, format conversion, bulk imports).

## Reading apps (OPDS)

Any OPDS-compatible app can connect to your library. Add your server's URL with `/opds` appended as an OPDS catalog. For example:

- **KOreader**: Settings → OPDS catalog → add URL
- **Moon+ Reader**: Library → Network Library → OPDS

## Documentation

- [Calibre Content Server manual](https://manual.calibre-ebook.com/server.html) — full reference for the content server.
- [Calibre upstream docs](https://calibre-ebook.com/) — general Calibre documentation.
