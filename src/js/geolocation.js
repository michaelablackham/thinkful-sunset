var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
    App.EventListeners.loadingScreen();
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(pos) {
    var pos = pos.coords;
    App.EventListeners.loadingScreen();
    $('.sunset-location').val('Current Location');
    $('.sunset-coords').val(pos.longitude + ',' + pos.latitude);
  };

  function error(err) {
    App.EventListeners.loadingScreen();
  };

  function geolocationAvailable() {
    if ("geolocation" in navigator) {
      $('.location-wrapper').addClass('coordinates');
    }
  }

  return {
    getLocation: getLocation,
    locationAvailable: geolocationAvailable
  }

  })(jQuery);
