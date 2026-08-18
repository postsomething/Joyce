(function (window) {
  'use strict';

  var Joyce = window.Joyce;

  Joyce.utils = Object.freeze({
    normalizeRoute: function (hash) {
      var route = String(hash || '').replace(/^#/, '');

      if (!route || route === '/') {
        return Joyce.config.defaultRoute;
      }

      return route.charAt(0) === '/' ? route : '/' + route;
    }
  });
}(window));
