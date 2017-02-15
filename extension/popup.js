chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action === 'getResources') {
    var str = '';
    var resources = request.resources;

    for (var i = 0, len = resources.length; i < len; i++) {
      str += setTemplate(resources[i]);
    }

    document.getElementById('container').innerHTML = str;
  }
});

window.onload = function () {
  injectScript();
};

function setTemplate(src) {
  return '<div class="row">' +
    '<div class="image-wrapper">' +
    '<img class="image" src="' + src + '" />' +
    '</div>' +
    '<a class="btn pull-right" href="' + src + '" download>' +
    'Download' +
    '</a>' +
    '<a class="btn pull-right" href="' + src + '" target="_blank">' +
    'Preview' +
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

