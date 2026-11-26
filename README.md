# Muse Shelf Support

Support and privacy pages for Muse Shelf (formerly Muse Media Tracker). The official copy is
musemedia.app, which Ship's Support pages step builds from this repo (muse-media-tracker's
`musemedia-site/build.mjs`, with this repo's `_headers`). GitHub Pages also serves the `main`
branch root, and every page's canonical link names musemedia.app.

- Support URL: `https://musemedia.app/`
- Privacy Policy URL: `https://musemedia.app/privacy`
- The old `muse-media-tracker-support.pages.dev` copy was uploaded by hand and nothing updates
  it: it should forward everything to musemedia.app (a deployment holding only a `_redirects`
  file with `/* https://musemedia.app/:splat 301`).
- `app-ads.txt` authorizes the app's AdMob inventory; keep it at the site root.

People reach Muse privately through `contact.html`. Its form posts to the Muse API Worker
(`POST https://muse-tracker-api.jasonmuse.workers.dev/api/contact`, in muse-media-tracker), and each
message lands in the Feedback inbox in Muse Shelf, which only Muse admins can read. Links can preset
the form, for example `contact.html?topic=report&app=frog-quest`. The pages no longer link to GitHub
issues, which are public; the issue forms in `.github/ISSUE_TEMPLATE` are still there, but unlinked.
