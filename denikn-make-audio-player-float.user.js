// ==UserScript==
// @name         Audio Player Floating at the Bottom of the Screen
// @namespace    https://github.com/kofaysi/denikn-scripts/edit/main/denikn-article-auto-scroll-w-audio.user.js
// @version      2024-01-04
// @description  Audio Player Floating at the Bottom of the Screen
// @match        https://denikn.cz/*
// @grant        none
// @author       https://github.com/kofaysi/
// ==/UserScript==

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

// Function to make the div floating
function makeDivFloating() {
    const audioDiv = document.querySelector('.audio2');
    if (audioDiv) {
        audioDiv.classList.add('floating-audio2');
    }
}

// Call the function when the page loads
window.addEventListener('load', makeDivFloating);
