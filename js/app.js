(function (window, document) {
  'use strict';

  function bootstrap() {
    window.Joyce.router.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
}(window, document));
