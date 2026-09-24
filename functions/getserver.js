//
//            Hello , World !
//
//     written by monster box studio
//     licensed under the mit license
//     https://github.com/Monster-Box
//

import raw from '../src/servers.js'
import { pick, fmt } from './lib/load.js'


export async function onRequestGet(context) {
  const url = new URL(context.request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return fmt({ code: 400, msg: 'need id' }, 400)//no id
  }
  if (!/^[\w-]{1,64}$/.test(id)) {
    return fmt({ code: 400, msg: 'bad id' }, 400)
  }

  const s = pick(raw, id)
  if (!s) {
    return fmt({ code: 404, msg: 'not found', query: id }, 404)//worng id
  }

  return fmt({//请求体
    code: 0,
    query: id,
    ip: s.ip,
    name: s.name,
    port: s.port,
    pubkey: s.pubkey,
    systray_light: s.systray_light,
    systray_dark: s.systray_dark,
    deeplink: s.deeplink,
    dflink: s.dflink,
    website: s.website,
    changelog_link: s.changelog_link,
    about_text: s.about_text
  })
}
