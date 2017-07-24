var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  $('.options').click(function () {
      $('.btn').removeClass('active');
      $(this).addClass('active');
    });


  // return {
  //   allowGeo: allowGeolocation,
  //   blockGeo: blockGeolocation
  // }

})(jQuery);
