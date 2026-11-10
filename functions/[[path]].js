//
//            Hello , World !
//
//     written by monster box studio
//     licensed under the mit license
//     https://github.com/Monster-Box
//

import raw from './lib/servers.js'
import { pick, fmt } from './lib/load.js'

// Passkey / Digital Asset Links routes.
//
// Android only validates the document served at the ROOT of the rp_id host:
//   https://<rp_id>/.well-known/assetlinks.json
// so the merged file below is the one Play Services actually fetches.
// /{server_id}/.well-known/assetlinks.json is the same document scoped to one
// server (per-server distribution) and /{server_id}/passkey.json hands the
// client its rp_id / origin so nothing passkey related is hardcoded in the APK.

function link(s) {
  const p = s && s.passkey
  if (!p) return null
  return {
    relation: ['delegate_permission/common.get_login_creds'],
    target: {
      namespace: 'android_app',
      package_name: p.package_name,
      sha256_cert_fingerprints: p.sha256_cert_fingerprints
    }
  }
}

function merge(list) {
  const out = []
  for (const s of list) {
    const l = link(s)
    if (!l) continue
    const seen = out.some(o =>
      o.target.package_name === l.target.package_name &&
      o.target.sha256_cert_fingerprints.join() === l.target.sha256_cert_fingerprints.join())
    if (!seen) out.push(l)
  }
  return out
}

function assetLinks(body) {
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*'
    }
  })
}

// Handles every method: Play Services probes the assetlinks document with HEAD
// before GET, and a method-specific handler would leave HEAD at the static 404.
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const parts = url.pathname.split('/').filter(Boolean)

  // /.well-known/assetlinks.json — merged, validated by Android
  if (parts.length === 2 && parts[0] === '.well-known' && parts[1] === 'assetlinks.json') {
    return assetLinks(merge(raw.servers))
  }

  // /{server_id}/.well-known/assetlinks.json — one server
  if (parts.length === 3 && parts[1] === '.well-known' && parts[2] === 'assetlinks.json') {
    const id = decodeURIComponent(parts[0])
    const s = pick(raw, id)
    if (!s || !s.passkey) {
      return fmt({ code: 404, msg: 'not found', query: id }, 404)
    }
    return assetLinks(merge([s]))
  }

  // /{server_id}/passkey.json — rp config fetched by the client
  if (parts.length === 2 && parts[1] === 'passkey.json') {
    const id = decodeURIComponent(parts[0])
    const s = pick(raw, id)
    if (!s || !s.passkey) {
      return fmt({ code: 404, msg: 'not found', query: id }, 404)
    }
    return fmt({
      code: 0,
      query: s.id,
      rp_id: s.passkey.rp_id,
      origin: s.passkey.origin,
      package_name: s.passkey.package_name,
      sha256_cert_fingerprints: s.passkey.sha256_cert_fingerprints
    })
  }

  return context.next()
}
