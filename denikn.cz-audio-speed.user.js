// ==UserScript==
// @name       Change Audio Playback Speed @denikn.cz
// @namespace  https://github.com/kofaysi/denikn-userscripts/blob/main/denikn.cz-audio-speed.user.js
// @version    1.6
// @description  Monitors and sets the playback speed of the audio based on the last saved value in localStorage, defaulting to 1.5, and saves any changes during the session
// @match      https://denikn.cz/*
// @author     https://github.com/kofaysi
// @grant      none
// ==/UserScript==

(function() {
    'use strict';

    // Function to set playback speed based on localStorage value
    function setPlaybackSpeed(savedSpeed) {
        var radioButtons = document.querySelectorAll('input[name="mep_0_speed"]');
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].value === savedSpeed) {
                radioButtons[i].click();
                break;
            }
        }
    }

    // Function to monitor and save any changes in playback speed
    function monitorSpeedChange() {
        var radioButtons = document.querySelectorAll('input[name="mep_0_speed"]');
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener('change', function() {
                if (this.checked) {
                    var newSpeed = this.value;
                    localStorage.setItem('audioPlaybackSpeed', newSpeed); // Save the new speed
                }
            });
        }
    }

    // Get the saved speed from localStorage, default to 1.5 if not set
    var savedSpeed = localStorage.getItem('audioPlaybackSpeed') || "1.75";

    // Apply the saved speed on page load
    setPlaybackSpeed(savedSpeed);

    // Start monitoring for any changes to playback speed
    monitorSpeedChange();

    // Optional: Regularly check and update playback speed (in case the speed is changed by other means)
    setInterval(function() {
        var currentSpeed = document.querySelector('input[name="mep_0_speed"]:checked').value;
        var savedSpeed = localStorage.getItem('audioPlaybackSpeed') || "1.75";
        if (currentSpeed !== savedSpeed) {
            localStorage.setItem('audioPlaybackSpeed', currentSpeed); // Update localStorage if speed has changed
        }
    }, 1000); // Check every second

})();
