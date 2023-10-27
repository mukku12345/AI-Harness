// console.log("Atleast reached background.js")

// // chrome.runtime.onMessage.addListener(function (message) {
// //    console.log("message.action is",message.action)
// //     if (message.action === "open_extension") {
// //       chrome.browserAction.openPopup();
// //     }
// //   });

  

//   const user = {
//     username: 'demo-user'
//   };
  
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     if (message === 'get-user-data') {
//         console.log("get-user-data")
//       sendResponse(user);
//     }

//     if(message === 'openExtension'){
//         sendResponse("hi");
//         window.open("https://www.w3schools.com");       
//     }
//     return true;
//   })


// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) { 
//   if (message.action === "openMetamask") {
//     chrome.windows.create({ url: "chrome-extension://ggdegphnombgcpfgnoaohkpffmfcaplc/index.html", type: "popup", width: 300, height: 500 });
//   }
// });
// background.js



// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

//    // Check if the message is to open the extension
// console.log("request action ==>",request.action)

//   if (request.action === 'openExtension') {
//     // Create a new panel window
//     chrome.windows.create({
//       url: 'chrome-extension://ggdegphnombgcpfgnoaohkpffmfcaplc/index.html',
//       type: 'popup',
//       width: 300,
//       height: 200,
//       left: Math.floor(request.x),
//       top: Math.floor(request.y),
//     });
//   }




// });


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === "complete" && tab.active) {
//     chrome.storage.local.set({ lastVisitedPage: tab.url });
//   }
// });



// background.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'setSelectedText') {
//     chrome.storage.local.set({ selectedText: message.selectedText });
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'getSelectedText') {
//     chrome.storage.local.get(['selectedText'], (result) => {
//       sendResponse({ selectedText: result.selectedText });
//     });
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.value) {
      // Send the value to the React app's content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { value: message.value });
      });
    }
  });