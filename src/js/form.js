var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"], form[name="locationToggle"]').submit(function (ev) {
      ev.preventDefault();

      App.EventListeners.loadingScreen();
      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();

      App.Prediction.get({
        type: sunVal,
        address: locationVal
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
