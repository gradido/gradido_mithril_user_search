'use strict'

import m from 'mithril'

function oninit(vnode) {
  
}

function view(vnode) {
 
  return m('div.modal.fade#' + vnode.attrs.id, {tabindex:'-1', role:'dialog'}, 
          m('div.modal-dialog', {role:'document'},
            m('div.modal-content'), [
                m('div.modal-header', [
                  m('button.close', {'data-dismiss':'modal', 'aria-label':'Schließen'}, m('span', {'aria-hidden':true}, m.trust('&times;'))),
                  m('h4.modal-title', vnode.attrs.title)
                ]),
                m('div.modal-body', vnode.attrs.body),
                m('div.modal-footer', [
                  m('a.btn.btn-primary', {type:'button', 'data-dismiss':'modal'}, 'Ok')
                ])
            ]))
}

export default { view, oninit }