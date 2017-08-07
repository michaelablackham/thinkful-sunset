var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  function useCurrentLocation() {
    $('.current-location').click(function(ev){
      ev.preventDefault();
      App.State.set({loadingText: 'Getting Current Location'});
      App.Geolocation.getLocation();
      $('#location').removeAttr('required');
    });
  }

  function clearForm() {
    $('.clear').click(function(ev){
      ev.preventDefault();
      $('#location').addAttr('required');
      $('input[type="text"]').val("");
    });
  }

  function homeButton() {
    $('.button-home').click(function() {
      App.Reset.resetPage();
    });
  }

  function toggleButton() {
    $('.button-menu').click(function() {
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
      var state = App.State.get();
      $('.loading-screen').addClass("active");
      $('.loading-screen').find('h2').text(state.loadingText);
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
