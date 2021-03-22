import m from 'mithril'

import rowView from './rowView'
import rowAction from './rowAction'


function oninit(vnode) {
  vnode.state.orderedUsers = []
  for(let i in vnode.attrs.users) {
    vnode.state.orderedUsers.push(vnode.attrs.users[i])
  }
  vnode.state.openedUser = -1
  vnode.state.order = {field:'default', dir:'DESC'}
}

function openButtonClick(vnode, index) {
  if(vnode.state.openedUser === index) {
    vnode.state.openedUser = -1
  } else {
    vnode.state.openedUser = index 
  }
}

function changeOrder(vnode, fieldName)
{
    const field = vnode.state.order.field
    const dir = vnode.state.order.dir
    if(field != fieldName) {
        vnode.state.order.field = fieldName
        vnode.state.order.dir = 'DESC'
    } else if(field == fieldName) {
        let new_dir;
        if(dir == 'DESC') {
            new_dir = 'ASC'
        } else {
            new_dir = 'DESC'
        }
        vnode.state.order.dir = new_dir
    }
    //console.log("change to %s %s", vnode.state.order.field, vnode.state.order.dir)
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

function sortByCreated(var1, var2, dir) {
    if(var1.created == var2.created) {
        return 0
    }
    const var1_date = new Date(var1.created)
    const var2_date = new Date(var2.created)
    // kleiner als null => niedriger index, a kommt zuerst, b kommt als nächstes
    // größer als null => höherer index, b kommt zuerst
    if(dir == 'DESC') {
        // descending
        if(var1_date < var2_date) {
            return 1
        } else {
            return -1
        }
    } else {
        // ascending
        if(var1_date < var2_date) {
            return -1
        } else {
            return 1
        }
    }
}

function sortyByString(var1, var2, dir, field) {
    if(var1[field] == var2[field]) {
        return 0
    }

    // kleiner als null => niedriger index, a kommt zuerst, b kommt als nächstes
    // größer als null => höherer index, b kommt zuerst
    if(dir == 'DESC') {
        // descending
        if(var1[field] < var2[field]) {
            return 1
        } else {
            return -1
        }
    } else {
        // ascending
        if(var1[field] < var2[field]) {
            return -1
        } else {
            return 1
        }
    }
}

function sortByBalance(var1, var2, dir) {
    if(var1.balance == var2.balance) {
        return 0
    }
    const var1_balance = parseFloat(var1.balance)
    const var2_balance = parseFloat(var2.balance)
    // kleiner als null => niedriger index, a kommt zuerst, b kommt als nächstes
    // größer als null => höherer index, b kommt zuerst
    if(dir == 'DESC') {
        // descending
        if(var1_balance < var2_balance) {
            return 1
        } else {
            return -1
        }
    } else {
        // ascending
        if(var1_balance < var2_balance) {
            return -1
        } else {
            return 1
        }
    }
}
// js sort work in place, so no copy is created
function sort(vnode, user) {
    const field = vnode.state.order.field
    const dir = vnode.state.order.dir
    if(field == 'created') {
        user.sort((var1, var2) => {return sortByCreated(var1, var2, dir)})
    }
    else if(field == 'name' || field == 'email' || field == 'pubkeyhex') {
        user.sort((var1, var2) => {return sortyByString(var1, var2, dir, field)})
    } else if(field == 'balance') {
        user.sort((var1, var2) => {return sortByBalance(var1, var2, dir)})
    }
    
}

function getArrow(vnode, fieldName)
{
    // Arrow-up: &#8593;
    // Arrow-down: &#8595;
    if(vnode.state.order.field == fieldName) {
        if(vnode.state.order.dir == 'DESC') {
            return m.trust('&#8595&nbsp;')
        } else {
            return m.trust('&#8593&nbsp;')
        }
    }
    return m.trust('&nbsp;&nbsp;')
}

function view (vnode) {
    // js sort work in place, so me made a deep copy first
   let user_sorted = JSON.parse(JSON.stringify(vnode.state.orderedUsers));
   if(vnode.state.order.field != 'default') {
       sort(vnode, user_sorted);
   }
   return m('table.table.table-hover.table-sm', [
     m('thead', m('tr.solid-header', [
       m('th', {style:{'padding-left':'1.5rem'}}),
       m('th', m('a', {onclick:() => {changeOrder(vnode, 'name')}, className:'grd_clickable'}, [getArrow(vnode, 'name'), window.texte.NAME])),
       m('th', m('a', {onclick:() => {changeOrder(vnode, 'email')}, className:'grd_clickable'}, [getArrow(vnode, 'email'), window.texte.EMAIL])),
       m('th', m('a', {onclick:() => {changeOrder(vnode, 'balance')}, className:'grd_clickable'}, [getArrow(vnode, 'balance'), window.texte.BALANCE])),
       m('th', m('a', {onclick:() => {changeOrder(vnode, 'pubkeyhex')}, className:'grd_clickable'}, [getArrow(vnode, 'pubkeyhex'), m.trust(window.texte.PUBLIC_KEY)])),
       m('th', m('a', {onclick:() => {changeOrder(vnode, 'created')}, className:'grd_clickable'}, [getArrow(vnode, 'created'), window.texte.CREATED]))
     ])),
     m('tbody', user_sorted.map((value, index) => {
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