(function (window, document) {
  'use strict';

  var Joyce = window.Joyce;
  var routes = Object.freeze({
    '/': 'view-home'
  });
  var started = false;

  function render() {
    var root = document.querySelector(Joyce.config.rootSelector);
    var route = Joyce.utils.normalizeRoute(window.location.hash);
    var templateId = routes[route] || routes[Joyce.config.defaultRoute];
    var template = document.getElementById(templateId);

    if (!root || !template || template.tagName !== 'TEMPLATE') {
      if (root) {
        root.textContent = '页面加载失败，请刷新后重试。';
      }
      window.console.error('Joyce H5: view root or template is missing.');
      return;
    }

    root.replaceChildren(template.content.cloneNode(true));
  }

  Joyce.router = Object.freeze({
    render: render,
    start: function () {
      if (started) {
        return;
      }

      started = true;
      window.addEventListener('hashchange', render);
      render();
    }
  });
}(window, document));
