var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        // do_something(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("no location")
    }
  }

  return {
    getLocation: getLocation
  }
})(jQuery);
