function openPageChrome(tab) {
    chrome.tabs.create({
      url: "sites.html"
    });
}

function openPageFirefox(tab) {
    browser.tabs.create({
      url: "sites.html"
    });
}

chrome.browserAction.onClicked.addListener(openPageChrome);
browser.browserAction.onClicked.addListener(openPageFirefox);
