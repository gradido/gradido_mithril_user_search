import m from 'mithril'

import AccountState from '../../model/AccountState'
import Gradido from '../../lib/Gradido'

//import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import { createPopper } from '@popperjs/core';
//import Popper from '@popperjs/core';

/*
 * <tr>
        <td class="pr-0 pl-4">
          <span class="text-black font-weight-medium d-block">
            <?= $user['name'] ?>
          </span>
          <span>
            <span class="status-indicator rounded-indicator small bg-<?= $user['indicator']['color'] ?>"></span>
            <small><?= __($user['indicator']['name']) ?></small>
          </span>
        </td>
        <td><?= $user['email'] ?></td>
        <td><?= $this->element('printGradido', ['number' => $user['balance']]) ?></td>
        <td title="<?= $user['pubkeyhex'] ?>"><?= substr($user['pubkeyhex'], 0, 10) ?><?php if(strlen($user['pubkeyhex']) > 0){ echo '...'; } ?></td>
        <td><?php if($user['created'] != null) {
            echo $user['created']->format('d.m.y H:i:s');   
        }
        ?></td>
      </tr>
*/

function loadTooltip(vnode, element, init, context) {
  console.log("load tooltip: %o", element)
  //const tooltip = event.target.querySelector('.tooltip');
  /*createPopper(event.target, tooltip, {
    placement: 'right',
  });*/
}

function oninit(vnode) {
  vnode.state.status = new AccountState(vnode.attrs.user.indicator.name)
}

function view (vnode) {
   const user = vnode.attrs.user
   const status = vnode.state.status
   const statusColor = status.getColor()
   const statusTitle = status.getTitle()
   
   let pubkey_shortend = user.pubkeyhex
   if(pubkey_shortend !== '') {
     pubkey_shortend = user.pubkeyhex.substring(0, 10) + '...'
   }
   let created = user.created
   if(created) {
     const creationDateTime = new Date(created)
     created = creationDateTime.toLocaleDateString() + " " + creationDateTime.toLocaleTimeString()
   }
   
   let actionTypes = status.hasActions();
   let actionColor = false
   switch(actionTypes) {
     case 'btn': actionColor = 'primary'; break;
     case 'warning': actionColor = 'danger'; break;
     case 'text': actionColor = 'secondary'; break;
   }
   
    
   return m('tr', [
     m('td', actionColor !== false ? m('i.mdi.mdi-menu-down.btn.btn-xs.btn-' + actionColor) : null),
     m('td.pr-0',[
       m('span.text-black.font-weight-medium.d-block', user.name),
       m('span', {config: (element, init, context)  => {loadTooltip(vnode, element, init, context); return false}}, [
         m('span.status-indicator.rounded-indicator.small.' + statusColor),
         m('small', statusTitle),
         m('.tooltip', {style:{display:'none'}}, status.getTooltip())
       ])
     ]),
     m('td', user.email),
     m('td', m(Gradido, {centAmount:user.balance})),
     m('td', {title:user.pubkeyhex}, pubkey_shortend),
     m('td', created)
   ])
}

export default { view, oninit }

