// ==UserScript==
// @name         Bakaláři autologin
// @namespace    https://znamky.ggg.cz
// @version      2025-02-05
// @description  automatic login into GGG Bakaláři
// @author       Michal-Martinek
// @match        *://znamky.ggg.cz/login*
// @icon         https://www.bakalari.cz/images/logos/bakalari-nova-tvar-02.png
// ==/UserScript==

const CREDENTIALS = {
    'username': '', // TODO solve this vuln
    'password': ''
};

(function() {
    document.getElementById("username").value = CREDENTIALS.username;
    document.getElementById("password").value = CREDENTIALS.password;
    let btn = document.getElementById("loginButton")
    btn.click()
})();
