var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
  var geocoder;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      App.EventListeners.loadingScreen();
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   console.log(position.coords.latitude, position.coords.longitude)
      //   var latitude = position.coords.latitude;
      //   var longitude = position.coords.longitude;
      //   return latitude;
      //   return longitude;
      // });
    // } else {
    //   console.log("no location")
    }
    // getAddress(lat, lon).then(console.log).catch(console.error);

    function successFunction(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      codeLatLng(lat, lng)
      $('.loading-screen').removeClass("active");
    }

    function errorFunction(){
        alert("Geocoder failed");
        $('.loading-screen').removeClass("active");
    }

    function initialize() {
      geocoder = new google.maps.Geocoder();
    }

    function codeLatLng(lat, lng) {

      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
          if (results[1]) {
           //formatted address
           alert(results[0].formatted_address)
            //find country name
            for (var i=0; i<results[0].address_components.length; i++) {
              for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                  //this is the object you are looking for
                  city= results[0].address_components[i];
                  break;
                }
              }
            }
          //city data
          alert(city.short_name + " " + city.long_name)
          } else { alert("No results found"); }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
    };
  }

  return {
    getLocation: getLocation
  }

  })(jQuery);
