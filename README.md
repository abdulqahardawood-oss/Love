# A Letter for Amara

A responsive, customizable love-letter landing page made with plain HTML, CSS, and JavaScript. No React or build step is required.

## Preview

Open `index.html` in a browser, or publish the project folder to Netlify with the publish directory set to the project root. The page uses Google Fonts when internet access is available and system fallbacks otherwise.

## Personalize for a client

- Change `recipient` and `sender` near the top of `script.js`.
- Edit the letter and promise copy in `index.html` to fit the client's story.
- Adjust colors, typography, and animations in `styles.css`.
- Opening the letter reveals the official Spotify embed for “Shape of You” by Ed Sheeran and attempts playback. Spotify playback depends on an internet connection, browser autoplay rules, and the listener’s Spotify account or region. For another song, replace the track URI in `script.js` with the URI from Spotify’s embed link.

The envelope click reveals the letter. The promise cards, reply text, and music status also stay hidden until their related controls are clicked. Buttons are keyboard accessible and animations respect reduced-motion preferences.




