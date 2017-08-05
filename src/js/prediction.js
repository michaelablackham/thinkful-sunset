var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'https://sunset-api.herokuapp.com'

  function getPrediction (params) {
    var queryParams = {
      type: params.type
    }

    //Only use if coordinates are used instead of input for city st
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
  }

  return {
    get: getPrediction
  }
})(jQuery);
