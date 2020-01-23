import m from 'mithril'

import AccountState from '../../model/AccountState'
import Gradido from '../../lib/Gradido'

import Tooltip from '../../lib/Tooltip'

function oninit(vnode) {
  
}


function view (vnode) {
  
   const status = new AccountState(vnode.attrs.user.indicator.name)
   const user = vnode.attrs.user
   const statusColor = status.getColor()
   const statusTitle = status.getTitle()
   
   let pubkey_shortend = user.pubkeyhex
   if(pubkey_shortend !== '') {
     pubkey_shortend = user.pubkeyhex.substring(0, 10) + '...'
   }
   let created = user.created
   if(created) {
     const creationDateTime = new Date(created)
     created = creationDateTime.toLocaleDateString() + "<br>" + creationDateTime.toLocaleTimeString()
   }
   
   let actionColor = false
   if(status.hasActions()) {
     actionColor = status.getRawColor()
   }
   
   
   let buttonState = 'down'
   if(vnode.attrs.open) {
     buttonState = 'up'
   }
   // disable until has function
   //actionColor = false
   //const tooltipContent = status.getTooltipText()
    
   return m('tr', [
     m('td', actionColor !== false ? 
      m('i.mdi.mdi-menu-' + buttonState + '.btn.btn-xs.btn-' + actionColor, {onclick:vnode.attrs.btnClick}) 
      : null
     ),
     m('td.pr-0',[
       m('span.text-black.font-weight-medium.d-block', user.name),
       m(Tooltip(m('span', [
          m('span.status-indicator.rounded-indicator.small.' + statusColor),
          m('small', statusTitle),
        ])), {accountState:status}), 
     ]),
     m('td', user.email),
     m('td', m(Gradido, {centAmount:user.balance})),
     m('td', {title:user.pubkeyhex}, pubkey_shortend),
     m('td', m.trust(created))
   ])
}

export default { view, oninit }

