/* 
 * @author: Dario Rekowski
 * 
 * @date: 23.01.20
 *  
 * @brief: delete user from Community-Server Button and ajax request
 */

import m from 'mithril'
import base from './actionBase'
import dialog from '../../../lib/dialog'

function oninit(vnode) {
  vnode.state.loading = false
  vnode.state.message = null
  vnode.state.showDialog = false
  vnode.state.copyResult = null
}

function cleanMessage(vnode) {
  vnode.state.message = null
  vnode.state.showDialog = false
  if(vnode.state.copyResult === 'success' && typeof vnode.attrs.deleteUser === 'function') {
    vnode.attrs.deleteUser()
  }
  //
}

function click(vnode) {
  vnode.state.loading = true
  vnode.state.showDialog = true
  //ajaxCopyLoginToCommunity
  m.request({
    method:'POST',
    url: window.location.protocol + '//' + document.domain + '/state-users/ajaxDelete',
    data: vnode.attrs.user,
  headers: {'X-CSRF-Token': csfr_token}
  }).then(function(result) {
      vnode.state.loading = false
      if(result.state === 'success') {
        vnode.state.message = m('div.alert.alert-success', window.texte.DELETE_FROM_COMMUNITY_SUCCESS)
        vnode.state.copyResult = 'success'
      } else {
        //console.log("result error")
        vnode.state.message  = m('div.alert.alert-danger', window.texte.DELETE_FAILED)
        vnode.state.copyResult = 'error'
      }

  }).catch(function(e) {
      vnode.state.loading = false
      vnode.state.message = m('div.alert.alert-danger', window.texte.AJAX_CRITICAL) 
      vnode.state.copyResult = 'critical error'
      console.error("ajax error: %s in file: %s in line: %d", e.message, e.fileName, e.lineNumber)
  });
}

function view(vnode) {
  // btn btn-primary
  // mdi mdi-content-copy
  // window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
  //console.log('draw view')
  
  return m('span', [
    m('span', [
      m('button.btn.btn-gradido-orange.btn-xs', {
        title:window.texte.DELETE_FROM_COMMUNITY,
        onclick:(e) => {click(vnode)},
        disabled: vnode.state.loading === true
      }, 
      vnode.state.loading === true ? 
          m('i.spinner-border.spinner-border-sm') : 
          m('i.mdi.mdi-delete')
      ),
      window.texte.DELETE_FROM_COMMUNITY
    ]),
    vnode.state.showDialog ? 
      m(dialog, {
        title: window.texte.DELETE_FROM_COMMUNITY,
        body: m('div', [
            vnode.state.loading ? 
              m('div', [
                m('i.spinner-border.spinner-border-sm'), 
                m.trust('&nbsp;'), 
                window.texte.DELETE_IN_PROGRESS]
              ) : null,
            m('div', vnode.state.message)
        ]),
        dismiss: (e) => {cleanMessage(vnode)}
      }) : null
  ])
}

export default { view, oninit }
