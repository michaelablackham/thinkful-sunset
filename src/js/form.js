var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"], form[name="locationToggle"]').submit(function (ev) {
      ev.preventDefault();

      //Get Values of all inputs
      var locationVal = $(ev.target).parent().find('.sunset-location').val();
      var coordsVal = $(ev.target).parent().find('.sunset-coords').val();
      var sunVal = $(ev.target).parent().find('.sun-event:checked').val();
      //Set the loading screen text and fire loading screen
      App.State.set({loadingText: 'Getting ' + sunVal + ' Prediction'});
      App.EventListeners.loadingScreen();

      //Send HTTP Request for multiple queries
      App.Prediction.get({
        type: sunVal,
        address: locationVal,
        coords: coordsVal
      })
      //Set state based on response from API server
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
      //When successful, send state to results page
      .then(function() {
        var state = App.State.get();
        if (state.currentPage === 'pageHome') {
          App.Render.setCurrentPage('pageResults');
        }
      })
      //Render results page
      .then(function() {
        App.Render.renderSunEvent();
        $('.resultsPage--toggle-form').removeClass('active');
      })
      //Catch for any errors
      .catch(function() {
        alert('Oops! Looks like something went wrong..');
        App.EventListeners.loadingScreen();
      })
    });
  }

  return {
    submit: submitForm
  }

})(jQuery);
