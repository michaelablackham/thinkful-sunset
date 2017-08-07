var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"] .submit').click(function (ev) {
      console.log('form submitted');

      ev.preventDefault();

      var locationVal = $('.sunset-location').val();
      var coordsVal = $('.sunset-coords').val();
      var sunVal = $('.sun-event:checked').val();
      App.State.set({loadingText: 'Getting ' + sunVal + ' Prediction'});
      App.EventListeners.loadingScreen();

      App.Prediction.get({
        type: sunVal,
        address: locationVal,
        coords: coordsVal
      })
      .then(function (payload) {
        App.State.set({
          sunType: payload.prediction.type,
          location: locationVal,
          forecast: {
            qualityPercent: payload.prediction.quality_percent,
            qualityString: payload.prediction.quality,
            recommendedTime: payload.prediction.recommended_time,
            temperature: payload.prediction.temperature
          }
        })
      })
      .then(function(){
        App.Render.setCurrentPage('pageResults');
      })
      .then(function(){
        App.Render.renderSunEvent();
      });
    });
  }

  return {
    submit: submitForm
  }

})(jQuery);
