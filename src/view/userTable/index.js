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

function oninit(vnode) {
  vnode.state.orderedUsers = [];
  for(let i in vnode.attrs.users) {
    vnode.state.orderedUsers.push(vnode.attrs.users[i])
  }
}

function view (vnode) {
  
   return m('table.table.table-hover.table-sm', [
     m('thead', m('tr.solid-header', [
       m('th', {style:{'padding-left':'1.5rem'}}),
       m('th', window.texte.NAME),
       m('th', window.texte.EMAIL),
       m('th', window.texte.BALANCE),
       m('th', m.trust(window.texte.PUBLIC_KEY)),
       m('th', window.texte.CREATED)
     ])),
     m('tbody', vnode.attrs.users.map(value => {
       return [
         m(row, {user:value}),
         //m(rowAction, {user:value})
       ]
     }))
   ])
}

export default { view, oninit }