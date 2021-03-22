import m from 'mithril'

import AccountState from '../../model/AccountState'
import Gradido from '../../lib/Gradido'

import Tooltip from '../../lib/Tooltip'
import dialog from '../../lib/dialog'

function oninit(vnode) {
  vnode.state.showEmail = false
  vnode.state.copyed = false
}

function toggleEmail(vnode) {
    vnode.state.showEmail = !vnode.state.showEmail
}

function showEmail(vnode) {
    vnode.state.showEmail = true
    
}

function hideEmail(vnode) {
    vnode.state.showEmail = false
    vnode.state.copyed = false
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
     actionColor = 'primary'
   }
   
   
   let buttonState = 'down'
   if(vnode.attrs.open) {
     buttonState = 'up'
   }
   
   // max width for email
   let email = user.email
   let isEmailShortend = false
   let allowedEmailLength = 25
   if(email.length > allowedEmailLength) {
       email = user.email.substr(0, allowedEmailLength) + '...'
       isEmailShortend = true
   }
   // disable until has function
   //actionColor = false
   //const tooltipContent = status.getTooltipText()
   
   let action = vnode.state.copyed ? 
    m('p', 'email copyed to clipboard') :
    m('input', {
                type:'text',
                name:'email',
                style:{border:'none', background:'transparent', display:'block'},
                value:user.email,
                onclick:(e) => {
                    //console.log(e)
                    e.target.select()
                    document.execCommand("copy")
                    vnode.state.copyed = true
                    m.reload()
                }})
    
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
     isEmailShortend ? 
        m('td', {title:user.email}, 
          m('a', {
              onclick:() => {toggleEmail(vnode)}//,
            }, email)
        ) : m('td', user.email),
     m('td', m(Gradido, {centAmount:user.balance})),
     m('td', {title:user.pubkeyhex}, pubkey_shortend),
     m('td', m.trust(created)),
     vnode.state.showEmail ? 
            m(dialog, {
                title:'Show oversized E-Mail',
                body: user.email,
                dismiss: () => {hideEmail(vnode)}
            })
            : null
   ])
}

export default { view, oninit }

