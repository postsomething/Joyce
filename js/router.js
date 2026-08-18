(function (window, document) {
  'use strict';

  var Joyce = window.Joyce;
  var routes = Object.freeze({
    '/': 'view-space',
    '/moments': 'view-moments',
    '/about': 'view-about',
    '/music': 'view-music'
  });
  var navItems = Object.freeze([
    { route: '/', label: 'Space', icon: '🐻' },
    { route: '/moments', label: 'Moments', icon: '♧' },
    { route: '/about', label: 'About', icon: '♡' },
    { route: '/music', label: 'Music', icon: '♫' }
  ]);
  var started = false;

  function createBottomNav(activeRoute) {
    var nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.setAttribute('aria-label', '底部导航');

    navItems.forEach(function (item) {
      var link = document.createElement('a');
      link.className = 'nav-item' + (item.route === activeRoute ? ' active' : '');
      link.href = '#' + item.route;
      link.setAttribute('aria-label', item.label);

      var icon = document.createElement('span');
      icon.className = 'nav-icon';
      icon.textContent = item.icon;

      var text = document.createElement('span');
      text.textContent = item.label;

      link.append(icon, text);
      nav.append(link);
    });

    return nav;
  }

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
    root.append(createBottomNav(routes[route] ? route : Joyce.config.defaultRoute));
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
