/* 
 * @author: Dario Rekowski
 * 
 * @date: 20.03.20
 *  
 * @brief: Object for buttons with start an ajax request
 */

import m from 'mithril'
import dialog from '../../../lib/dialog'

function oninit(vnode) {
  vnode.state.loading = false
  vnode.state.message = null
  vnode.state.showDialog = false
  vnode.state.ajaxResult = null
}

function cleanMessage(vnode) {
  vnode.state.message = null
  vnode.state.showDialog = false
  if(vnode.state.ajaxResult === 'success' && typeof vnode.attrs.updateStateFunc === 'function' && typeof vnode.attrs.successState !== 'undefined') {
    //vnode.attrs.updateState('account copied to community')
    vnode.attrs.updateStateFunc(vnode.attrs.successState)
  }
  //
}

function click(vnode) {
  vnode.state.loading = true
  vnode.state.showDialog = true
  //ajaxCopyLoginToCommunity
  m.request({
    method:'POST',
    url: window.location.protocol + '//' + document.domain + '/state-users/' + vnode.attrs.actionNamePHP,
    data: vnode.attrs.ajaxData,
  headers: {'X-CSRF-Token': csfr_token}
  }).then(function(result) {
      vnode.state.loading = false
      if(typeof vnode.attrs.ajaxHandler === 'function') {
        vnode.attrs.ajaxHandler(result)
      } else {
        if(result.state === 'success') {
          vnode.state.message = m('div.alert.alert-success', vnode.attrs.alertSuccess)
          vnode.state.ajaxResult = 'success'
        } else {
          //console.log("result error")
          vnode.state.message  = m('div.alert.alert-danger', vnode.attrs.alertFailed)
          vnode.state.ajaxResult = 'error'
        }
      }

  }).catch(function(e) {
      vnode.state.loading = false
      vnode.state.message = m('div.alert.alert-danger', window.texte.AJAX_CRITICAL) 
      vnode.state.ajaxResult = 'critical error'
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
      m('button.btn.' + vnode.attrs.btnColor + '.btn-xs', {
        title: vnode.attrs.btnTitle,
        onclick:(e) => {click(vnode)},
        disabled: vnode.state.loading === true
      }, 
      vnode.state.loading === true ? 
          m('i.spinner-border.spinner-border-sm') : 
          m('i.mdi.'+ vnode.attrs.btnSymbol)
      ),
      vnode.attrs.btnTitle
    ]),
    vnode.state.showDialog ? 
      m(dialog, {
        title: vnode.attrs.btnTitle,
        btnDisabled: vnode.state.loading,
        body: m('div', [
            vnode.state.loading ? 
              m('div', [
                m('i.spinner-border.spinner-border-sm'), 
                m.trust('&nbsp;'), 
                vnode.attrs.progessText]
              ) : null,
            m('div', vnode.state.message)
        ]),
        dismiss: (e) => {cleanMessage(vnode)}
      }) : null
  ])
}

export default { view, oninit }
