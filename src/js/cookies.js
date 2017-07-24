var App = App || {};

App.Cookies = (function($) {
  'use strict';

  function allowGeolocation() {
    console.log("set cookies for 3 months")
    // Cookies.set('name', 'value', { expires: 100 });
  }

  function blockGeolocation() {
    console.log("set cookies for 24 hours")
    // Cookies.set('name', 'value', { expires: 1 });
  }

  return {
    allowGeo: allowGeolocation,
    blockGeo: blockGeolocation
  }

})(jQuery);
