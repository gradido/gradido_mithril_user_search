import m from 'mithril'
import copyLoginCommunity from './actions/copyLoginCommunity'
import deleteCommunityServer from './actions/deleteCommunityServer'
import userTransactionsOverview from './actions/userTransactionsOverview'
import copyCommunityLogin from './actions/copyCommunityLogin'
import verificationResend from './actions/verificationResend'

const checkTodoAction = new RegExp(/{{([a-z-]*)}}/)

function oninit(vnode) {
  // csfr_token
  vnode.state.accountStateTexte = window.texte.ACCOUNT_STATES[vnode.attrs.user.indicator.name];
}

function getAction(name) {
  switch(name) {
    case 'copy-from-login-to-community-server': return copyLoginCommunity;
    //case 'delete-from-community-server': return deleteCommunityServer;
    case 'user-transactions-overview': return userTransactionsOverview;
    case 'copy-from-community-to-login-server': return copyCommunityLogin;
    case 'verification-resend': return verificationResend;
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
           if(value === '<hr>') {
             return m.trust('</ul><hr><ul>')
           }
           else if(!matches) {
              return m('li', value)
           } else {
              const acc = getAction(matches[1])
              if(acc) {
                //return m(acc, {user:vnode.attrs.user})
                return m('li', m(acc, {
                  user:vnode.attrs.user, 
                  updateState:vnode.attrs.updateState,
                  deleteUser: vnode.attrs.deleteUser
                }))
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