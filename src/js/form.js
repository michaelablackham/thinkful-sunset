var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"]').submit(function (ev) {
      ev.preventDefault();

      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();
      App.State.set({
        location: locationVal,
        sunType: sunVal
      });

      console.log(App.State.get());
    });
  }

  return {
    submit: submitForm
  }

})(jQuery);
