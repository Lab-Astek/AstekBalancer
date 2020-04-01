chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(null, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {}
                })
            ],
            actions: [
                new chrome.declarativeContent.ShowPageAction(),
            ]
        }]);
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        chrome.tabs.getSelected(null, tab => {
            if (new URL(tab.url).hostname != "intra.epitech.eu")
                return;
            chrome.tabs.executeScript(tab.id, {code: `var astekifier_data = JSON.parse('${JSON.stringify(request)}');`}, resp => {
                chrome.tabs.executeScript(tab.id, {file: "js/main.js"}, resp => {});
            });
        });
    });
});
