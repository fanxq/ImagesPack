chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(null, { file: 'style.css' });
	chrome.tabs.executeScript(null, {file: "FileSaver.min.js"});
	chrome.tabs.executeScript(null, {file: "jszip.js"});
	chrome.tabs.executeScript(null, {file: "jquery.min.js"});
	chrome.tabs.executeScript(null, {file: "content.js"});
});