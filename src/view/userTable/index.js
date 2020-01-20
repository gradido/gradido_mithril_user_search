import m from 'mithril'

import row from './row'
/*
 * 
  <table class="table table-hover table-sm">
    <thead>
      <tr class="solid-header">
        <th class="pl-4">Name</th>
        <th>E-Mail</th>
        <th>Kontostand</th>
        <th>Public Key</th>
        <th>Erstellt</th>
      </tr>
    </thead>
    <tbody>
      foreach: userTableRow
    </tbody>
  </table>
  
 */

function view (vnode) {
   return m('table.table.table-hover.table-sm', [
     m('thead', m('tr.solid-header', [
       m('th.pl-4', window.texte.NAME),
       m('th', window.texte.EMAIL),
       m('th', window.texte.BALANCE),
       m('th', window.texte.PUBLIC_KEY),
       m('th', window.texte.CREATED)
     ])),
     m('tbody', m('userTableBody', {users:vnode.attrs.users}))
   ])
}

export default { view }