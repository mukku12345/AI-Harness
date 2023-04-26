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



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) { 
  if (message.action === "openMetamask") {
    chrome.windows.create({ url: "chrome-extension://ggdegphnombgcpfgnoaohkpffmfcaplc/index.html", type: "popup", width: 300, height: 500 });
  }
});