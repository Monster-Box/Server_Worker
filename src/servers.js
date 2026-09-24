export default {
  servers: [
    {
      id: 'test', // query key, matched by ?id=
      name: 'tg', // sidebar title
      ip: '192.0.2.1',
      port: 9443,
      pubkey: 'NULL',
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
