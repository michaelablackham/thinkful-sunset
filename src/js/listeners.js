var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  function useCurrentLocation() {
    $(".current-location").click(function(){
      App.Geolocation.getLocation();
    });
  }

  function homeButton() {
    $(".button-home").click(function() {
      App.Reset.resetPage();
    });
  }

  return {
    useCurrent: useCurrentLocation,
    homeButton: homeButton
  }

})(jQuery);
