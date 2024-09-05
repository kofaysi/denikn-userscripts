// ==UserScript==
// @name       Change Audio Playback Speed
// @namespace  https://github.com/kofaysi/
// @version    1.2
// @description  Sets the playback speed of the audio based on the last saved value in localStorage, defaulting to 1.75
// @match      https://denikn.cz/*
// @grant      none
// @author     https://github.com/kofaysi
// ==/UserScript==

(function() {
    'use strict';

    // Function to set the playback speed
    function setPlaybackSpeed(speed) {
        var radioButtons = document.querySelectorAll('input[name="mep_0_speed"]');
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].value === speed) {
                radioButtons[i].click();
                localStorage.setItem('audioPlaybackSpeed', speed); // Save the selected speed to localStorage
                break;
            }
        }
    }

    // Get the saved speed from localStorage, default to 1.5 if not set
    var savedSpeed = localStorage.getItem('audioPlaybackSpeed') || "1.75";

    // Apply the saved speed
    setPlaybackSpeed(savedSpeed);

    // Optionally, you could allow the user to change the speed and save the new setting here
})();
