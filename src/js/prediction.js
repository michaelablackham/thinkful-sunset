var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'https://sunset-api.herokuapp.com'

  function getPrediction (params) {
    var queryParams = {
      type: params.type
    }

    params.coords
      ? queryParams.coords = param.coords
      : queryParams.address = params.address

    return jQuery.ajax({
      async: true,
      url: API_BASE_URL + '/predict',
      data: queryParams,
      dataType: 'json',
      type: 'GET'
    })
      // .then(function (payload) {
      //   // console.log('payload', payload);
      //   App.State.set(
      //     { forecast: {
      //         qualityPercent: payload.prediction.quality_percent,
      //         qualityString: payload.prediction.quality,
      //         recommendedTime: payload.prediction.recommended_time,
      //         temperature: payload.prediction.temperature
      //       }
      //     }
      //   )
      //   // return payload.quality;
      //   console.log(App.State.get())
      // })
      // .then(function (quality) {
        // console.log('quality', prediction.quality);
      // })
  }

  return {
    get: getPrediction
  }
})(jQuery);
