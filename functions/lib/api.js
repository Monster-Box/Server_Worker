//
//            Hello , World !
//
//     written by monster box studio
//     licensed under the mit license
//     https://github.com/Monster-Box
//

//pick
export function pick(all, id) {
  return all.servers.find(s => s.id === id) || null
}

//back type
export function fmt(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  })
}
