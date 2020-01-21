/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import m from 'mithril'
import { createPopper } from '@popperjs/core';


export default function Tooltip() {
    //var tooltip

    return {
        oncreate: function(vnode) {
            // Initialize 3rd party lib here
            const tooltip = vnode.dom.querySelector('.tooltip');
            // Pass the button, the tooltip, and some options, and Popper will do the
            // magic positioning for you:
            createPopper(vnode.dom, tooltip, {
              placement: 'right',
            });
        },
        onremove: function() {
            // Cleanup 3rd party lib on removal
        },
        view: function() {
            return m('div')
        }
    }
}