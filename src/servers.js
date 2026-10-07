// SPDX-FileCopyrightText: 2026 Monster Box Studio
// SPDX-License-Identifier: MIT

// Static server table served by /getserver. Keep this file free of secrets and
// of anything you do not want published — every field below is returned to
// whoever knows the server id.
export default {
  servers: [
    {
      id: 'baigram', // query key, matched by ?id=
      name: 'Baigram', // sidebar title
      ip: '127.0.0.1',
      port: 9442,
      pubkey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAyvtCrgb/pUx09Bn4QHy1Fsz3F5EZe24GcjY8KziFzjhTOAkkDHeM\naSBsCfiIChgzU9oJEWP2FPaFa4K2iiRbZNb1SktmA4w4FdNO/uIqo4i1emTrZT6l\npC7sHED+ZKO8Iessoqt3NBE5oApuKbvtRvNRA+xn6EzvdupYzTIrghgaR+CzK1Cs\n63TK3uwCG+xWwfdK3U95cAB8U1bFeeE0gWguMT+zcYxFcWQCBxW/BYg2Piuuztie\nFJO7wFe6cuX4CaVlTorWet5/JlKzJz3MFGHRQHgRk1bixzFmc4z99UWG6G5Vpxhs\nTOlMx6qlFl8TNLPSEaSBPMp5gP1jnAtOtwIDAQAB\n-----END RSA PUBLIC KEY-----',
      systray_light: '', // tray icon, light theme
      systray_dark: '', // tray icon, dark theme
      deeplink: 'tg', // used as <deeplink>://settings
      dflink: '', // used as <dflink>/$username
      website: 'https://baigram.pages.dev',
      changelog_link: 'https://baigram.pages.dev/changelog',
      about_text:
        'Official free messaging app based on [Baigram API](https://baigram.pages.dev/apps) for speed and security.\n\nSource code is available on [GitHub](https://github.com/Monster-Box)',
    },
  ],
}
