import m from 'mithril'

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

function oninit(vnode) {

}


function view (vnode) {
   
}

export default { view, oninit }

