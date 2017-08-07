var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
    App.EventListeners.loadingScreen();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        App.EventListeners.loadingScreen();
        $('.sunset-location').val('Current Location');
        $('.sunset-coords').val(position.coords.longitude + ',' + position.coords.latitude);
      });
    }
    else {
      console.log('blocked')
      App.EventListeners.loadingScreen();
    }
  }

  function geolocationAvailable() {
    if ("geolocation" in navigator) {
      $('.location-wrapper').addClass('coordinates');
    } else {
      console.log("no location")
    }
  }

  return {
    getLocation: getLocation,
    locationAvailable: geolocationAvailable
  }

  })(jQuery);
