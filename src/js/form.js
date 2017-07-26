var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"]').submit(function (ev) {
      ev.preventDefault();

      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();

      App.Prediction.get({
        type: sunVal,
        address: locationVal
      })
    });
  }

  return {
    submit: submitForm
  }

})(jQuery);
