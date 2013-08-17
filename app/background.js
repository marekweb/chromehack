var PAGE = 'page.html';


chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create(PAGE, {
    bounds: {
      width: 640,
      height: 520
    }
  });
});

//chrome.contextMenus.create(object createProperties, function callback)