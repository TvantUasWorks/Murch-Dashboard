# TVANT / GREENSOL — MURCH PV Client Portal

Upload all files from **inside this directory** to the root of `TvantUasWorks/Murch-Dashboard` on the `main` branch. Preserve `data/` and `dailys/` folder paths.

The Oct 17 PDF is included. Oct 11–16 are indexed but their PDFs have **not** been bundled; the portal says `PDF not uploaded` for these dates. Add their originals using the corresponding filenames in `data/history.json`, then set `pdf_available` to `true` for each uploaded entry.

Data comes from the actual Oct 17 TUW Daily export. OTDR, SCADA Communications, and Inverter Precommissioning Inspection have a scope of 23 INV each but are **Not reported**, rather than 0%, until their states are in a new published JSON.

The portal is public. No authentication. Do not upload other private information.
