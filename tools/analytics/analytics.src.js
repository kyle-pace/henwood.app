// Amplitude for henwood.app, set up to be as private as possible:
// - no IP address, and a random ID kept in localStorage (no cookies);
// - off for browsers that send Global Privacy Control or Do Not Track, and for anyone who
//   turns it off on the Privacy page (localStorage "henwood.analyticsOff");
// - only on the live site, so local previews and forks aren't counted;
// - no Session Replay and no custom events: page views and clicks are enough for now.
// It reports to the Henwood project in Amplitude, the same one the app uses, so the site
// and the app can be read side by side. The key is public by design.
//
// This is the only file that talks to Amplitude. `npm run build` here bundles it into
// /analytics.js. Pages don't load that directly: each one loads the tiny
// /analytics-loader.js, which fetches /analytics.js only when analytics should run, so
// nobody who has it off downloads it.
import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = "e6a7709fe633307daace8688fd019afa";

// /analytics-loader.js decides whether this file loads at all (live site, not opted out),
// so by the time it runs the answer is yes.
if (AMPLITUDE_API_KEY) {
  amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: true,
    identityStorage: 'localStorage',
    trackingOptions: { ipAddress: false },
  });
}
