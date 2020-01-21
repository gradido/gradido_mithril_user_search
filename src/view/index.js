import m from 'mithril'

import userTable from './userTable'
import AccountState from '../model/AccountState'
/*
 * <?php if(isset($finalUserEntrys) && count($finalUserEntrys) > 0) : ?>
        userTable
      <?php elseif(isset($finalUserEntrys)) :  ?>
      <div class="grid-body py-3">
          <p class="grid-header"><?= __('Keine Benutzer gefunden') ?></p>
        </div>
      <?php endif; ?>
 */

/*
<div class="tippy-popper">
  <div class="tippy-tooltip" data-placement="top">
    <div class="tippy-backdrop"></div> <!-- animateFill: true -->
    <div class="tippy-arrow"></div> <!-- arrow: true -->
    <div class="tippy-content">
      My content
    </div>
  </div>
</div>
*/

function view (vnode) {
   if(g_users === undefined) {
     return m('')
   }
   else if(g_users.length > 0) {
     const acc = new AccountState('account not on login-server')
     return m('', [
       m('.grid-body.py-3', m('p.grid-header', window.texte.USER_FOUND)),
       m('.table-responsive', m(userTable, {users:g_users}))
       /*m('.tippy-popper', 
        m('.tippy-tooltip', {'data-placement': 'top'}, [
          m('.tippy-backdop'),
          m('.tippy-arrow'),
          m('.tippy-content', acc.getTooltip())
        ]))*/
     ])
     return m(userTable, {users:g_users})
   } else {
     return m('.grid-body.py-3', m('p.grid-header', window.texte.NO_USER_FOUND))
   }
}

export default { view }