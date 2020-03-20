/* 
 * @author: Dario Rekowski
 * 
 * @date: 20.03.20
 *  
 * @brief: getting email verification code in silence
 */

import m from 'mithril'
import base from './actionBase'
import dialog from '../../../lib/dialog'

function oninit(vnode) {
  vnode.state.loading = true
  vnode.state.results = null
  vnode.state.copyResult = false
  
  m.request({
    method:'POST',
    url: window.location.protocol + '//' + document.domain + '/state-users/ajaxCountTransactions',
    data: vnode.attrs.user,
  headers: {'X-CSRF-Token': csfr_token}
  }).then(function(result) {
      vnode.state.loading = false
      if(result.state === 'success') {
        vnode.state.message = m('div.alert.alert-success', window.texte.DELETE_FROM_COMMUNITY_SUCCESS)
        vnode.state.copyResult = 'success'
        vnode.state.results = result.counts
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

function getField(vnode, index) {
  if(null === vnode.state.results) {
    return m('i.spinner-border.spinner-border-sm')
  } else if(index in vnode.state.results) {
    return vnode.state.results[index]
  } else {
    return '0'
  }
}

function view(vnode) {
   return m('span', [
     window.texte.RECEIVE_TRANSACTIONS_COUNT,
     getField(vnode, 'receive'),
     ', ',
     window.texte.SENDED_TRANSACTIONS_COUNT,
     getField(vnode, 'sended'),
     ', ',
     window.texte.CREATION_TRANSACTIONS_COUNT,
     getField(vnode, 'creation')
   ])
}

export default { view, oninit }