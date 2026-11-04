# Muse Shelf Support

Support and privacy pages for Muse Shelf (formerly Muse Media Tracker), served by GitHub Pages
from the `main` branch root.

- Support URL: `https://jasonmuse.github.io/muse-media-tracker-support/`
- Privacy Policy URL: `https://jasonmuse.github.io/muse-media-tracker-support/privacy.html`
  (the app links here from its paywall; keep this path)
- `app-ads.txt` authorizes the app's AdMob inventory; keep it at the site root.

People reach Muse privately through `contact.html`. Its form posts to the Muse API Worker
(`POST https://muse-tracker-api.jasonmuse.workers.dev/api/contact`, in muse-media-tracker), and each
message lands in the Feedback inbox in Muse Shelf, which only Muse admins can read. Links can preset
the form, for example `contact.html?topic=report&app=frog-quest`. The pages no longer link to GitHub
issues, which are public; the issue forms in `.github/ISSUE_TEMPLATE` are still there, but unlinked.
