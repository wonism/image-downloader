var src;
var urls = Array.prototype.map
  .call(
    document.getElementsByTagName('img'),
    function (el) {
      src = el.src.replace(/\?.+/, '');

      if (src.match(/^data\:image|\/\//)) {
        return src;
      }

      return document.location.origin.replace(/\/$/, '') + '/' + src;
    }
  ).reduce(
    function (a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }

      return a;
    }, []
  );

chrome.extension.sendMessage({
  action: 'getResources',
  resources: urls,
});

