'use strict'

import m from 'mithril'

function oninit(vnode) {
  
}

function view(vnode) {
 
  return m('div.modal.visible-modal', {tabindex:'-1', role:'dialog'}, 
          m('div.modal-dialog', {role:'document'},
            m('div.modal-content', [
                m('p.grid-header', vnode.attrs.title),
                m('div.modal-body', vnode.attrs.body),
                m('div.modal-footer', [
                  m('button.btn.btn-primary', {type:'button', 'data-dismiss':'modal', onclick:vnode.attrs.dismiss}, 'Ok')
                ])
            ])))
}

export default { view, oninit }