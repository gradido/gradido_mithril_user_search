/* 
 * @author: Dario Rekowski
 * 
 * @date: 22.01.20
 *  
 * @brief: copy Account from Login-Server to Community-Server Button and ajax request
 */

import m from 'mithril'
import base from './actionBase'


function oninit(vnode) {
  vnode.state.loading = false
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
        
      } else {
        if(vnode.attrs.callback != undefined) {
          vnode.attrs.callback(vnode.attrs.row.getData().user_id)
        }
        mainState.errors.push(caller + ' return with state: ' + result.state + ', msg: ' + result.msg)
      }

  }).catch(function(e) {
      vnode.state.loading = false
      console.error(caller + " request return error: %o", e.message);
      try {
        vnode.attrs.mainState.errors.push(caller + ' request return error:'  + e.message + ' in file: ' + e.fileName + ' in line: ' + e.lineNumber)
      } 
      catch(e) {
        console.error(caller + " error setting error: %s in file: %s in line: %d", 
        e.message, e.fileName, e.lineNumber)
      }
  });
}

function view(vnode) {
  // btn btn-primary
  // mdi mdi-content-copy
  // window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
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
    ])
  ])
}

export default { view, oninit }
