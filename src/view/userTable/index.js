import m from 'mithril'

import rowView from './rowView'
import rowAction from './rowAction'


function oninit(vnode) {
  vnode.state.orderedUsers = [];
  for(let i in vnode.attrs.users) {
    vnode.state.orderedUsers.push(vnode.attrs.users[i])
  }
  vnode.state.openedUser = -1
}

function openButtonClick(vnode, index) {
  if(vnode.state.openedUser === index) {
    vnode.state.openedUser = -1
  } else {
    vnode.state.openedUser = index 
  }
}

function updateStateForActiveUser(newState, vnode) {
  //console.log('updateStateForActiveUser')
  if(-1 !== vnode.state.openedUser) {
    vnode.state.orderedUsers[vnode.state.openedUser].indicator.name = newState
    vnode.state.openedUser = -1
  }
}

function deleteActiveUser(vnode) {
  if(-1 !== vnode.state.openedUser) {
    vnode.state.orderedUsers.splice(vnode.state.openedUser, 1)
    vnode.state.openedUser = -1
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
     m('tbody', vnode.state.orderedUsers.map((value, index) => {
       const open = vnode.state.openedUser === index
       return [
         m(rowView, {
           user:value, 
           open:open, 
           btnClick:() => {openButtonClick(vnode, index)}
         }),
         open ? m(rowAction, {
           user:value,
           updateState:(newState) => {updateStateForActiveUser(newState, vnode)},
           deleteUser:() => {deleteActiveUser(vnode) }
         }) : null
         //m(rowAction, {user:value})
       ]
     }))
   ])
}

export default { view, oninit }