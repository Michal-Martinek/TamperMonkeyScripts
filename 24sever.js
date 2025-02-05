// ==UserScript==
// @name         24Sever autologin
// @namespace    https://www.24sever.org
// @version      2024-01-19
// @description  automatic login into 24sever.org
// @author       Michal-Martinek
// @match        https://www.24sever.org/*
// @icon         https://www.24sever.org/soubory/znak24sever.png
// ==/UserScript==

const CREDENTIALS = {
    'username': '',
    'password': ''
}

function redirect(url) {
    location.href = url;
}

function login(callbackUrl) {
    let div = document.getElementById("content");
    let table = div.getElementsByClassName("contour_table")[0];
    table.querySelectorAll('input[name="user"]')[0].value = CREDENTIALS['username'];
    table.querySelectorAll('input[name="password"]')[0].value = CREDENTIALS['password'];
    table.querySelectorAll('input[type="submit"]')[0].click();

    setTimeout(function() {
        redirect(callbackUrl);
    }, 100);
}

(function() {
    if (window.location.href.endsWith("prihlaseni/")) {
        console.log("logging in, redirect to " + document.referrer + "?retry=0");
        login(document.referrer);
    } else if (window.location.href.startsWith("https://www.24sever.org/editace")) {
        console.log("checking privileges");
        let content = document.getElementsByClassName("entry-content");
        if (content && content[0] && content[0].textContent.includes("Nemáte oprávnění")) {
            console.log("logging in")
            redirect("https://www.24sever.org/prihlaseni");
        }
    }
})();

