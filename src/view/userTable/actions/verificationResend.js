/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//mdi-email

import m from 'mithril'
import base from './actionBase'

function view(vnode) {
  // btn btn-primary
  // mdi mdi-content-copy
  // window.texte.COPY_FROM_LOGIN_TO_COMMUNITY
  //console.log('draw view')
  
  return m(base, {
    actionNamePHP: 'ajaxVerificationEmailResend',
    ajaxData: vnode.attrs.user,
    alertSuccess: window.texte.VERIFICATION_EMAIL_RESEND_SUCCESS,
    alertFailed:  window.texte.RESEND_FAILED,
    btnColor: 'btn-primary',
    btnSymbol: 'mdi-email',
    btnTitle: window.texte.VERIFICATION_EMAIL_RESEND,
    progessText: window.texte.RESEND_IN_PROGRESS
  })
}

export default { view }