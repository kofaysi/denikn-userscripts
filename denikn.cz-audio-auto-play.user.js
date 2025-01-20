// ==UserScript==
// @name         Integrated Audio Player Control @denikn.cz
// @namespace    https://github.com/kofaysi/denikn-userscripts/blob/main/denikn.cz-audio-auto-play.user.js
// @version      1.8
// @description  Autoplay and toggle scrolling text and floating of audio player on denikn.cz
// @match        https://denikn.cz/*
// @author       https://github.com/kofaysi
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let intervalId;
    let autoPlay = true;
    let autoScrollEnabled = true;
    let floatEnabled = true;
    let autoScrollAndFloatEnabled = true;
    let adjustArticleViewInterval = 5000;
    let toggleFloatingDivInterval = 200;

    // Wait for the DOM to be fully loaded
    window.addEventListener('load', function() {
        //    document.addEventListener('DOMContentLoaded', () => {
        // Auto-play the audio
        let playButton = document.querySelector('button[aria-label="Play"]');
        if (playButton && autoPlay) {
            playButton.click();
            autoScrollEnabled = true;
            floatEnabled = true;
        }
    });

    function isAudioPlaying() {
        let audio = document.querySelector('audio');
        return audio && !audio.paused;
    }

    function adjustArticleView() {
        // Check if audio is playing and auto-scroll is enabled
        if (!autoScrollAndFloatEnabled || !isAudioPlaying()) return;
        
        // Get the scaleX value of the audio player marker
        const audioMarker = document.querySelector('.audio2_time-current');
        const scaleX = parseFloat(audioMarker.style.transform.match(/scaleX\(([^)]+)\)/)[1]);

        const article = document.querySelector('.a_single.a_single__post.a_single__default');
        const articleRect = article.getBoundingClientRect();

        const articleStart = articleRect.top + window.pageYOffset;
        const articleHeight = articleRect.height;
        const windowHeight = window.innerHeight;

        // Calculate baseline scroll position to center the start of the article
        const baselineScroll = articleStart - (windowHeight / 2);

        // Calculate the maximum scrollable distance
        const maxScroll = articleStart + articleHeight - windowHeight;

        // Adjust the target scroll position based on the scaleX value
        const targetScroll = baselineScroll + (scaleX * (maxScroll - baselineScroll));

        // Scroll the article into view
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }

    // Interval to constantly check the state of autoScrollEnabled
    setInterval(adjustArticleView, adjustArticleViewInterval);

       function createToggleScrollAndFloatButtonInPlayer() {
        // Find the container where other control buttons are placed
        const controlsContainer = document.querySelector('.audio2_controls');

        // Create a new button
        const button = document.createElement('button');
        button.className = 'audio2_button audio2_scroll_and_float-button'; // Use the same class as other buttons for consistent styling

        // Function to update button text and color
        function updateButton() {
            if (autoScrollAndFloatEnabled) {
                button.textContent = '⟳';
                button.style.fontSize = '28px';
                button.title = "Toggle auto-scroll and float";
                button.style.color = '#32CD32'; // Bright green color
            } else {
                button.textContent = '⟳↕';
                button.style.fontSize = '16px';
                button.title = "Toggle auto-scroll and float";
                button.style.color = '#FF4500'; // Orange-red color
            }
        }

        // Initial update
        updateButton();

        // Event listener for the button click
        button.addEventListener('click', function() {
            autoScrollAndFloatEnabled = !autoScrollAndFloatEnabled;
            updateButton();
        });

        // Append the button to the controls container
        if (controlsContainer) {
            controlsContainer.appendChild(button);
        }

        // Expose the update function so it can be called externally
        return updateButton;
    }

    const updateAutoScrollAndFloatButton = createToggleScrollAndFloatButtonInPlayer();
    // Store the update function for later use

    // Add CSS for floating div
    const style = document.createElement('style');
    style.textContent = `
    .floating-audio2 {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: white; /* or any color you prefer */
        box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); /* optional shadow for better visibility */
        z-index: 1000; /* to ensure it's above other elements */
    }
`;
    document.head.appendChild(style);

    // Function to toggle the floating state of the div
    function toggleFloatingDiv() {
        const audioDiv = document.querySelector('.audio2');
        if (audioDiv) {
            if (autoScrollAndFloatEnabled) {
                audioDiv.classList.add('floating-audio2');
            } else {
                audioDiv.classList.remove('floating-audio2');
            }
        }
    }

    // Interval to constantly check the state of floatEnabled
    setInterval(toggleFloatingDiv, toggleFloatingDivInterval);
})();
