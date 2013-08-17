var PAGE = 'page.html';

// chrome.browserAction.onClicked.addListener(onButtonClicked);

// function onButtonClicked() {
	
// 	chrome.tabs.create({ url: PAGE });
// }


// chrome.app.runtime.onLaunched.addListener(function() {
//   chrome.app.window.create('main.html', {
//     bounds: {
//       width: 800,
//       height: 600,
//       left: 100,
//       top: 100
//     },
//     minWidth: 800,
//     minHeight: 600
//   });
// });

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create(PAGE, {
    bounds: {
      width: 640,
      height: 520
    }
  });
});