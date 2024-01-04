// ==UserScript==
// @name         Article Scroll Based on Audio Position
// @namespace    https://github.com/kofaysi/denikn-scripts/edit/main/denikn-article-auto-scroll-w-audio.user.js
// @version      1.0
// @description  Scroll view of an article based on audio player position
// @match        https://denikn.cz/*
// @grant        none
// @author       https://github.com/kofaysi/
// ==/UserScript==

(function() {
    'use strict';

    let intervalId;
    let scriptEnabled = true;

    function adjustArticleView() {
        if (!scriptEnabled) return;

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

    function createToggleButton() {
        const button = document.createElement('button');
        button.textContent = 'Disable Scroll'; // Default text
        button.style.position = 'fixed';
        button.style.top = '50%';
        button.style.left = '0';
        button.style.transform = 'translate(0, -50%)';
        button.style.width = '20%';
        button.style.height = '10%';
        button.style.backgroundColor = '#0047AB'; // Dark Blue background
        button.style.color = '#FFFFFF'; // Bright White text
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.zIndex = '1000';

        button.addEventListener('click', function() {
            scriptEnabled = !scriptEnabled;
            button.textContent = scriptEnabled ? 'Disable Scroll' : 'Enable Scroll';
        });

        document.body.appendChild(button);
    }

    createToggleButton();

    // Initialize the interval

    // Update the scroll position every three seconds
    setInterval(adjustArticleView, 3000);
})();
