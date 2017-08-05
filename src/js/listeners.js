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

  function toggleButton() {
    $(".button-menu").click(function() {
      App.ToggleForm.toggleMenu();
    });
  }

  return {
    useCurrent: useCurrentLocation,
    homeButton: homeButton,
    menuButton: toggleButton
  }

})(jQuery);
