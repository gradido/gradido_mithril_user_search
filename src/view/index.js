import m from 'mithril'

import userTable from './userTable'
/*
 * <?php if(isset($finalUserEntrys) && count($finalUserEntrys) > 0) : ?>
        userTable
      <?php elseif(isset($finalUserEntrys)) :  ?>
      <div class="grid-body py-3">
          <p class="grid-header"><?= __('Keine Benutzer gefunden') ?></p>
        </div>
      <?php endif; ?>
 */

function view (vnode) {
   if(g_users === undefined) {
     return m('')
   }
   else if(count(g_users) > 0) {
     return m('', [
       m('.grid-body.py-3', m('p.grid-header', window.texte.USER_FOUND)),
       m('.table-responsive', m(userTable, {users:g_users}))
     ])
     return m(userTable, {users:g_users})
   } else {
     return m('.grid-body.py-3', m('p.grid-header', window.texte.NO_USER_FOUND))
   }
}

export default { view }