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
      return m('.grid', [
        m('h6.grid-header', ac_texte.description.title),
        ac_texte.description.lines != undefined ? 
          m('ul', ac_texte.description.lines.map((short, index) => {
            //console.log('line short: %o, index: %o', short, index)
            const lineText = window.texte.ACCOUNT_STATES.LINES[index]
            let symbol = ''
            if(short === '+') {
              symbol = '.mdi-check.color-success'
            } else if(short === '-') {
              symbol = '.mdi-close.color-danger'
            } else if(short === '/') {
              symbol = '.mdi-alert-circle-outline.color-warning'
            }
            return m('li', [
              m('i.mdi' + symbol),
              m('span', m.trust('&nbsp;')),
              m('span', [
                m('b', lineText.title + ': '),
                m('span', lineText[short])
              ])
            ])
          })) : null
      ])
    }
    getTooltipText() {
      //console.log("getTooltipText")
      const ac_texte = window.texte.ACCOUNT_STATES[this.stateName]
      let html = '<div class="grid">';
      html += '<h6 class="grid-header">' + ac_texte.description.title + '</h6>'
      if(ac_texte.description.lines != undefined) {
        html += '<ul>';
        for(let i in ac_texte.description.lines) {
          const symbol = ac_texte.description.lines[i]
          const lineText = window.texte.ACCOUNT_STATES.LINES[i]
          let symbolClass = 'mdi '
          if(symbol === '+') {
            symbolClass += ' mdi-check color-primary'
          } else if(symbol === '-') {
            symbolClass += ' mdi-close color-danger'
          } else if(symbol === '/') {
            symbolClass += ' mdi-alert-circle-outline color-warning'
          } else {
            continue;
          }
          html += '<li>';
          html += '<i class="' + symbolClass + '"></i>';
          html += '<span>&nbsp;</span>';
          
          html += '<span><b>' + lineText.title + ': </b>' + lineText[symbol] + '</span>'
          html += '</li>';
        }
        html += '</ul>';
      }
      html += '</div>';
      //console.log("return html: %o", html)
      return html;
    }
    
    
}