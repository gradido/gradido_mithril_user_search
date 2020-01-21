/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//"use strict";
import m from 'mithril'

/*
__('account created');
__('account not on login-server');
__('email activated');
__('account copied to community');
__('email not activated');
__('account multiple times on login-server');
__('account not on community server');
__('no keys');
*/

export default class AccountState {
    constructor(stateName) {
      this.stateName = stateName
      this.texte= window.texte.ACCOUNT_STATES[stateName]
    }
    
    getColor() {
      return 'bg-' + this.texte.color
    }
    
    getTitle() {
      return this.texte.title
    }
    
    hasActions() {
      switch(this.stateName) {
        case 'account created':
        case 'email not activated':
        // currently didn't occure
        case 'account not on community server': 
        case 'email activated': 
          return 'btn';
        
        case 'account not on login-server':
        case 'account multiple times on login-server':
          return 'warning';
          
        case 'account copied to community': 
          return false;
      }
    }
    
    getTooltip() {
      const ac_texte = window.texte.ACCOUNT_STATES[this.stateName]
      return m('', [
        m('span', ac_texte.description.title),
        ac_texte.description.lines != undefined ? 
          m('ul', ac_texte.description.lines.map((short, index) => {
            //console.log('line short: %o, index: %o', short, index)
            const lineText = window.texte.ACCOUNT_STATES.LINES[index]
            let symbol = ''
            if(short === '+') {
              symbol = '.mdi-check.color-success'
            } else if(short === '-') {
              symbol = '.mdi-close.color-danger'
            }
            return m('li', [
              m('i.mdi' + symbol),
              m('span', lineText.title + ': ' + lineText[short])
            ])
          })) : null
      ])
    }
    
    
}