/* 
 * @author: Dario Rekowski
 * 
 * @date: 22.01.20
 *  
 * @brief: copy Account from Login-Server to Community-Server Button and ajax request
 */

import m from 'mithril'
import base from './actionBase'

function view(vnode) {
  // btn btn-primary
  // mdi mdi-content-copy
  // window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
  //console.log('draw view')
  
  return m(base, {
    updateStateFunc: vnode.attrs.updateState,
    successState: 'email not activated',
    actionNamePHP: 'ajaxCopyCommunityToLogin',
    ajaxData: vnode.attrs.user,
    alertSuccess: window.texte.COPY_FROM_COMMUNITY_TO_LOGIN_SUCCESS,
    alertFailed:  window.texte.COPY_FAILED,
    btnColor: 'btn-gradido-orange',
    btnSymbol: 'mdi-content-copy',
    btnTitle: window.texte.COPY_FROM_COMMUNITY_TO_LOGIN,
    progessText: window.texte.COPY_IN_PROGRESS
  })
}

export default { view }
