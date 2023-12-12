// ==UserScript==
// @name       Change Audio Playback Speed
// @namespace  https://github.com/kofaysi/
// @version    1
// @description  Sets the playback speed of the audio to 1.5 on page load
// @match      https://denikn.cz/*
// @grant      none
// ==/UserScript==

(function() {
    'use strict';
    var radioButtons = document.querySelectorAll('input[name="mep_0_speed"]');
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].value === "1.50") {
            radioButtons[i].click();
            break;
        }
    }
})();
