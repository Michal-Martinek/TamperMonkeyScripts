// ==UserScript==
// @name         YT music ad skipping
// @namespace    http://tampermonkey.net/
// @version      2025-05-03
// @description  if ad is detected, skips to next song, then back - ad doesn't appear again
// @author       MM
// @match        https://music.youtube.com*
// @icon         https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg
// ==/UserScript==

// 1) Wait until the player‐bar is in the DOM
function waitForPlayerBar() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const bar = document.querySelector('ytmusic-player-bar');
      if (bar) {
        clearInterval(interval);
        resolve(bar);
      }
    }, 500);
  });
}

function findSkipBtn(retries=0) {
    console.log(`looking for skip, retry: ${retries}`);
    const selectors = [".ytp-ad-skip-button", ".ytp-ad-skip-button-modern"];
    selectors.forEach((selector) => {
        const skipButtons = document.querySelectorAll(selector);
        for (const skipButton of skipButtons) {
                if (retries >= 2) {
                    skipSong();
                }
                console.log('found&clicked btn:', skipButton);
                skipButton.click();
                setTimeout(() => findSkipBtn(retries+1), 1000);
            }
    })
}
function isAd() {
    let ad = document.querySelector('.ytp-ad-module');
    return ad && ad.checkVisibility();
}
function skipSong() {
    console.log('Skipping song')
    if (isAd()) {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'j'}));
        console.log('J pressed')
        setTimeout(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k'}));
            console.log('K pressed')
        }, 500);
    }
}

function dismissPremiumBanner() {
    let NoThanks = document.querySelector('button.yt-spec-button-shape-next[aria-label="Ne, děkuji"]');
    if (NoThanks == null) return;
    try {
        NoThanks.click();
        console.log('dismissed Premium banner')
    } finally {}
}

(async () => {
  const playerBar = await waitForPlayerBar();

  console.log("Player bar:", playerBar)
  // 2) Set up an observer just on the title node
  const titleNode = playerBar.shadowRoot
                    ? playerBar.shadowRoot.querySelector('.title')
                    : playerBar.querySelector('.title');
  if (!titleNode) return;
  console.log("found title node: ", titleNode)

  // from: ktakeda47/AutoClickYouTubeSkipAdButton.user.js
    const callback = (muts, observer) => {
        console.log("Observer callback called");
        dismissPremiumBanner();
        for (const m of muts) {
            if (m.type === 'childList') {
                console.log('Song changed to:', titleNode.innerText);
            }
        }
        if (isAd()) {
            console.log('ad detected');
            setTimeout(skipSong, 200);
            return;
        }
        // findSkipBtn();
    };
  // make overlay-ads hidden
    /*const overlayAds = document.querySelectorAll(".ytp-ad-overlay-slot");
    for (const overlayAd of overlayAds) {
      overlayAd.style.visibility = "hidden";
    }
  };*/


  // observer instance
  const observer = new MutationObserver(callback);

  // observation options
  const options = {
    childList: true,
    subtree: true,
  };

  // start MutationObserver#observe()
  const startObservation = (targetNode) => {
    if (targetNode) {
      observer.observe(targetNode, options);
    }
  };

  // if using the whole document -> it updates always
  // const target = document.documentElement;
  startObservation(titleNode);
})();
