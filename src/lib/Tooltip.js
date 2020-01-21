/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import m from 'mithril'
//import { createPopper } from '@popperjs/core';
import tippy from 'tippy.js';
//import 'tippy.js/dist/tippy.css';


export default function Tooltip(object) {
    //var tooltip

    return {
        oncreate: function(vnode) {
            // Initialize 3rd party lib here
            
            //const tooltip = vnode.dom.querySelector('.tooltip');
            //console.log("Tooltip::oncreate vnode.dom: %o, tooltip: %o", vnode.dom, tooltip)
            // Pass the button, the tooltip, and some options, and Popper will do the
            // magic positioning for you:
            /*createPopper(vnode.dom, tooltip, {
              placement: 'right',
            });*/
          tippy(vnode.dom, {
            content: vnode.attrs.accountState.getTooltipText(),
            placement: 'right-start',
            theme: 'rippleUI-theme',
            arrow: false
          });//*/
          // bootstrap tooltip
          /*$(vnode.dom).tooltip({
            placement:'right',
            title: vnode.attrs.accountState.getTooltipText()
          })*/
        },
        onremove: function() {
            // Cleanup 3rd party lib on removal
        },
        view: function() {
            return object
        }
    }
}