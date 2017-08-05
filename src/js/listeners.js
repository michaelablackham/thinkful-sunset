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
      toggleForm();
    });
  }

  function toggleForm() {
    $('.resultsPage--toggle-form').toggleClass('active');
    $('.button-menu').toggleClass('active');
  }

  function loadingScreen() {
    if ($('.loading-screen').hasClass('active')) {
      $('.loading-screen').removeClass("active");
    }
    else {
      $('.loading-screen').addClass("active");
    }
  }

  return {
    useCurrent: useCurrentLocation,
    homeButton: homeButton,
    menuButton: toggleButton,
    toggleMenu: toggleForm,
    loadingScreen: loadingScreen
  }

})(jQuery);
