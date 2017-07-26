var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'http://sunset-api.herokuapp.com'

  function getPrediction (params) {
    return jQuery.ajax({
      async: true,
      url: API_BASE_URL + '/predict',
      data: {
        type: params.type,
        address: params.address
      },
      dataType: 'json',
      type: 'GET'
    });

    console.log(prediction.type);
  }

  return {
    get: getPrediction
  }
})(jQuery);
