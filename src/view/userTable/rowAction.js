import m from 'mithril'
import copyLoginCommunity from './actions/copyLoginCommunity'


const checkTodoAction = new RegExp(/{{([a-z-]*)}}/)

function oninit(vnode) {
  // csfr_token
  vnode.state.accountStateTexte = window.texte.ACCOUNT_STATES[vnode.attrs.user.indicator.name];
}

function getAction(name) {
  switch(name) {
    case 'copy-from-login-to-community-server': return copyLoginCommunity;
  }
  return null
}

function view (vnode) {
  
  const todo = vnode.state.accountStateTexte.todo
  
  let lines = todo.lines
  
  
   return m('tr' , 
     m('td.actions', {colspan:'6'}, [
       m('p', todo.title),
       lines.length > 0 ? m('ul', [
         lines.map((value) => {
           const matches = value.match(checkTodoAction)
           //console.log(matches)
           if(!matches) {
              return m('li', value)
           } else {
              const acc = getAction(matches[1])
              if(acc) {
                //return m(acc, {user:vnode.attrs.user})
                return m('li', m(acc, {user:vnode.attrs.user}))
              } else {
               return m('li', value)
              }
            }
         })
       ]) : null
     ])
   )
}

export default { view, oninit }