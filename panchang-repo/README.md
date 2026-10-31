# Panchang site: GitHub + Netlify (auto deploy on every change)

## One-time setup (no command line needed)
1. Create a free GitHub account, then click New repository. Name it (for example `panchang`), leave it empty, click Create.
2. On the new repository page click "uploading an existing file". Unzip this project and drag everything inside the folder
   (`netlify`, `public`, `package.json`, `netlify.toml`, `README.md`) into the page. Click Commit changes.
3. Go to app.netlify.com, Add new site, Import an existing project, choose GitHub, allow access, pick your repository.
4. Leave the build settings as they are (netlify.toml fills them in). Click Deploy. Netlify installs the packages itself.
5. Open the link Netlify shows. Your site is live.

## Updating
Edit a file on GitHub (pencil icon) or upload a new version, then Commit. Netlify rebuilds and publishes by itself in about a minute.
If a change breaks the site, Netlify keeps the last good version live; open Deploys in Netlify and choose Publish deploy on an older one.

## Settings (Netlify, Site configuration, Environment variables)
SITE_NAME = your site title. BANNER_HTML = any banner or ad HTML shown at the top of pages.
Custom domain: Netlify, Domain management, Add a domain. Then replace YOUR-DOMAIN in public/robots.txt and edit public/privacy.html.

## Pages
/ (today, Delhi), /panchang/<city>/<yyyy-mm-dd>, /calendar/<city>/<yyyy-mm>, /muhurat/<city>/<vivah|griha-pravesh|vehicle|naamkaran>,
/eclipses/<city>, /kundli, /diary.html, /hi/... (Hindi), /sitemap.xml

## Optional: command line deploy
`npm install` then `npx netlify-cli deploy --prod` (deploy.sh / deploy.bat do this).

## Notes
Calculations use Astronomy Engine on the server. Untested on a live deploy: compare a few dates with Drik Panchang first.

## Known limits (checked against published 2026 festival dates)
24 of 25 test festivals matched. Holika Dahan can land a day early when Bhadra covers the evening of Purnima.
Narak Chaturdashi and Govardhan Puja are published on different days by different sources. Eclipses, moonrise and Guru/Shukra asta
could not be tested without the live astronomy library, so compare them with Drik Panchang after you deploy.
