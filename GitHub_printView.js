// ==UserScript==
// @name         GitHub markdown file printing
// @namespace    http://tampermonkey.net/
// @version      2025-02-05
// @description  injects button which strips unnecessary headers from GitHub webpage for printing of MarkDown files
// @author       Michal-Martinek
// @match        https://github.com/Michal-Martinek/Soon2Grad/blob*.md
// @icon         https://github.com/fluidicon.png
// ==/UserScript==

function togglePrintView() {
    document.querySelector('header').remove();
    //document.querySelector('#StickyHeader').remove();
    document.querySelector('.flex-column').remove();
    document.querySelector('.react-code-size-details-banner').remove();
    document.querySelector('#repos-sticky-header').remove();
    document.querySelector('div[data-testid="breadcrumbs-filename"');
    document.querySelector("section").style.margin = 0;
    document.querySelector(".js-snippet-clipboard-copy-unpositioned").style.padding = 0;
}

const svgHtml = ' \
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#000" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> \
        <rect x="3" y="7" width="18" height="10" rx="2" ry="2"></rect> \
        <path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"></path> \
        <path d="M7 14h10"></path> \
        <path d="M7 18h10v4H7z"></path> \
    </svg>';

(function() {
    const searchBtn = document.querySelector('.AppHeader-search');
    const cloned = searchBtn.cloneNode(true);
    searchBtn.parentNode.insertBefore(cloned, searchBtn);
    const button = cloned.querySelector('button');
    cloned.firstElementChild.replaceWith(button);

    button.style.background = "#FFFF00"
    button.style.borderColor = "#0FF"
    button.addEventListener('click', togglePrintView);
    button.classList.remove('AppHeader-search-whenNarrow');
    button.innerHTML = svgHtml;
    // togglePrintView();
})();
