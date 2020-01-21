import m from 'mithril'

import numeral from 'numeral'

let inited = false
function oninit(vnode) {
  if(!inited) {
    numeral.register('locale', 'de', {
      delimiters: {
          thousands: '.',
          decimal: ','
      },
      currency: {
          symbol: '€'
      }
    });
    numeral.locale( 'de' )
    inited = true
  }
}

/*
//$class = 'grd-negative-currency';
$class = '';
//$title = '' . $number;

if($number < 0) {
  $class = 'grd-negative-currency';  
}

?>
<span class="<?php echo $class;?>">
  <?= $this->Number->format(intval($number) / 10000.0, ['precision' => 2]) . ' GDD';?>
</span>
*/

function germanFormat(gradido) {
  numeral.locale( 'de' )
  return numeral(gradido).format(	'0,0.00' )
}

function view (vnode) {
  
  
  
  
  return m('span', germanFormat(vnode.attrs.centAmount / 10000.0) + ' GDD')
  //return
}

export default { view, oninit }