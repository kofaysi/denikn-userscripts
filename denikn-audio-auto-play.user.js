// ==UserScript==
// @name       Auto-play audios
// @namespace  https://github.com/kofaysi/
// @version    1.0
// @description  Automatically play audio on denikn.cz
// @match      https://denikn.cz/*
// @grant      none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the DOM to be fully loaded
    window.addEventListener('load', function() {
        // Auto-play the audio
        let playButton = document.querySelector('button[aria-label="Play"]');
        if (playButton) {
            playButton.click();
        }
    });
})();

