'use strict'

import m from 'mithril'

import view from './view'

import texte_de from './texte/de'


function launch () {
  //m.mount(window.document.getElementById('canvas'), view)
  //if(window.language == 'de') {
    window.texte = texte_de;
  //}
  
  m.mount(window.document.getElementById('gradido-mithril-user-search'), view)
}

// DOM ready without jquery, loaded from basic.js
// cross browser dom is ready
(function(document, window, domIsReady, undefined) {
   domIsReady(function() {
      launch();
   });
})(document, window, domIsReady);
