chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.query(
    //     {active: true, currentWindow: true}, 
    //     function(tabs) {
    //         chrome.tabs.sendMessage(
    //             tabs[0].id, 
    //             {action: "imgpack"}
    //         );
    // });
    chrome.tabs.sendMessage(tab.id, {action:'imgpack'});
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request  === "close"){
            chrome.tabs.query(
                {active: true, currentWindow: true}, 
                function(tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id, 
                        {action: "imgpack"}
                    );
            });
        }
});