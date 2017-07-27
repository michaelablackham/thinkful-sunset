var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  function useCurrentLocation() {
    $(".current-location").click(function(){
      App.Geolocation.getLocation();
    });
  }

  function getAboutInformation() {
    $(".about-sunset").click(function(){
      console.log("about section");
    });
  }

  return {
    useCurrent: useCurrentLocation
  }

})(jQuery);
