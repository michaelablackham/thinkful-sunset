var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
  var geocoder;

    if ("geolocation" in navigator) {
      App.EventListeners.loadingScreen();
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.longitude + ',' + position.coords.latitude)
        App.EventListeners.loadingScreen();
        $('.sunset-location').val('Current Location');
        $('.sunset-coords').val(position.coords.longitude + ',' + position.coords.latitude);
      });
    } else {
      console.log("no location")
    }

  }

  return {
    getLocation: getLocation
  }

  })(jQuery);
