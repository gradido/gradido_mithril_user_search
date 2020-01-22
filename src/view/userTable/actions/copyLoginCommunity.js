/* 
 * @author: Dario Rekowski
 * 
 * @date: 22.01.20
 *  
 * @brief: copy Account from Login-Server to Community-Server Button and ajax request
 */

import m from 'mithril'
import base from './actionBase'
import dialog from '../../../lib/dialog'

function oninit(vnode) {
  vnode.state.loading = false
  vnode.state.message = null
}

function cleanMessage(vnode) {
  vnode.state.message = null
}

function click(vnode) {
  vnode.state.loading = true
  //ajaxCopyLoginToCommunity
  m.request({
    method:'POST',
    url: window.location.protocol + '//' + document.domain + '/state-users/ajaxCopyLoginToCommunity',
    data: vnode.attrs.user,
  headers: {'X-CSRF-Token': csfr_token}
  }).then(function(result) {
      vnode.state.loading = false
      if(result.state === 'success') {
        vnode.state.message = m('div.alert.alert-success', window.texte.COPY_FROM_LOGIN_TO_COMMUNITY_SUCCESS)
      } else {
        //console.log("result error")
        vnode.state.message  = m('div.alert.alert-danger', window.texte.COPY_FAILED)
      }

  }).catch(function(e) {
      vnode.state.loading = false
      vnode.state.message = m('div.alert.alert-danger', window.texte.AJAX_CRITICAL) 

      console.error("ajax error: %s in file: %s in line: %d", e.message, e.fileName, e.lineNumber)
  });
}

function view(vnode) {
  // btn btn-primary
  // mdi mdi-content-copy
  // window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
  //console.log('draw view')
  
  return m('p', [
    m('span', [
      m('button.btn.btn-gradido-orange.btn-xs', {
        title:window.texte.COPY_FROM_LOGIN_TO_COMMUNITY,
        onclick:(e) => {click(vnode)},
        disabled: vnode.state.loading === true
      }, 
      vnode.state.loading === true ? 
          m('i.spinner-border.spinner-border-sm') : 
          m('i.mdi.mdi-content-copy')
      ),
      window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
    ]),
    vnode.state.message !== null ? 
      m(dialog, {
        title: window.texte.COPY_FROM_LOGIN_TO_COMMUNITY,
        body: m('div', vnode.state.message),
        dismiss: (e) => {cleanMessage(vnode)}
      }) : null
  ])
}

export default { view, oninit }
