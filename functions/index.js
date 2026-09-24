//
//            Hello , World !
//
//     written by monster box studio
//     licensed under the mit license
//     https://github.com/Monster-Box
//


import conf from '../src/config.js'

export async function onRequest(context) {// onR 返回json格式
  return Response.redirect(conf.home, 302)
}
