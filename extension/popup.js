chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action === 'getResources') {
    var container = document.getElementById('container'), str = '', resources = request.resources;

    if (!resources.length) {
      container.innerHTML = '<p class="no-images">There are no images.</p>';

      return;
    }

    for (var i = 0, len = resources.length; i < len; i++) {
      str += setTemplate(resources[i]);
    }

    container.innerHTML = str;
  }
});

window.onload = function () {
  injectScript();
};

function setTemplate(src) {
  return '<div class="image-wrapper">' +
    '<a href="' + src + '" target="_blank">' +
    '<img class="image" src="' + src + '" />' +
    '</a>' +
    '<a class="button download-button" href="' + src + '" download>' +
    'DOWNLOAD' +
    '</a>' +
    '</div>';
}

function injectScript() {
  chrome.tabs.executeScript(null, {
			file: 'getResources.js',
    }, function () {
      if (chrome.extension.lastError) {
        document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
      }
  });
}

