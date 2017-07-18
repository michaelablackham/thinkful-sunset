var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  function getPrediction (params) {
    var qualityString = ['Good', 'Poor'][Math.floor(Math.random() * 2)];
    var officialTime = new Date();
    var recommendedTime = new Date();

    (params && params.type === 'sunrise')
      ? officialTime.setHours(5)
      : officialTime.setHours(17);

    recommendedTime.setHours(officialTime.getHours());

    return Promise.resolve({
      temperature: Math.floor(Math.random() * 11 + 65), //convert from C to F
      recommendedTime: recommendedTime.toISOString(), //recommended time for sunset/sunrise
      officialTime: officialTime.toISOString(), //official time of sunset/sunrise
      qualityPercent: qualityString === 'Good' ? 75 : 25, //% 0-100 of quality of sunrise/sunset
      qualityString: qualityString //% quality of sunrise/sunset in word
    });
  }

  return {
    get: getPrediction
  }
})(jQuery);
