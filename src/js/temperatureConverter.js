var App = App || {};

App.ConvertTemp = (function($) {
  'use strict';

  function celsiusToFahrenheit() {
    var state = App.State.get();
    var currentTemp = state.forecast.temperature;
    return Math.round(currentTemp * 9 / 5 + 32);
  }

  return {
    fahrenheit: celsiusToFahrenheit
  }

})(jQuery);
