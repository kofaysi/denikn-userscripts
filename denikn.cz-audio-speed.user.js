// ==UserScript==
// @name       Change Audio Playback Speed @denikn.cz (n3_audio)
// @namespace  https://github.com/kofaysi/denikn-userscripts/blob/main/denikn.cz-audio-speed.user.js
// @version    2.0
// @description  Persist and apply audio playback speed using the new n3_audio select
// @match      https://denikn.cz/*
// @grant      none
// ==/UserScript==

(function () {
  'use strict';

  const LS_KEY = 'audioPlaybackSpeed';
  const DEFAULT_SPEED = '1.75';

  const getAudio = () => document.querySelector('#n3_audio_html5, #n3_audio audio');
  const getSpeedSelect = () => document.querySelector('.n3_audio_speed');

  function applySpeedToUI(val) {
    const sel = getSpeedSelect();
    if (!sel) return false;
    if (![...sel.options].some(o => o.value === val)) return false;
    sel.value = val;
    // Fire change to let site logic update UI/ARIA
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function applySpeedToAudio(val) {
    const a = getAudio();
    if (!a) return false;
    const num = parseFloat(val);
    if (!isFinite(num) || num <= 0) return false;
    a.playbackRate = num;
    return true;
  }

  function loadSaved() {
    return localStorage.getItem(LS_KEY) || DEFAULT_SPEED;
  }

  function save(val) {
    localStorage.setItem(LS_KEY, String(val));
  }

  function initOnce() {
    const sel = getSpeedSelect();
    const a = getAudio();
    if (!sel || !a) return false;

    // 1) Set from saved
    const saved = loadSaved();
    applySpeedToUI(saved) || (sel && (sel.value = saved));
    applySpeedToAudio(saved);

    // 2) When user changes select -> save + apply to audio
    sel.addEventListener('change', () => {
      const v = sel.value || DEFAULT_SPEED;
      save(v);
      applySpeedToAudio(v);
    });

    // 3) When site changes audio rate -> reflect to UI + save
    a.addEventListener('ratechange', () => {
      const v = String(a.playbackRate);
      applySpeedToUI(v);
      save(v);
    });

    return true;
  }

  // Try now, then watch for late hydration
  const ready = () => document.readyState === 'complete' || document.readyState === 'interactive';
  if (ready()) setTimeout(initOnce, 0);
  else window.addEventListener('DOMContentLoaded', initOnce);

  new MutationObserver(() => initOnce())
    .observe(document.documentElement, { childList: true, subtree: true });
})();
