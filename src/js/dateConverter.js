var App = App || {};

App.ConvertTime = (function($) {
  'use strict';

  function convertTime() {
    var state = App.State.get();
    var recommendedTime = new Date(state.forecast.recommendedTime).toLocaleTimeString();
    return recommendedTime;

  }

  function convertDate() {
    var state = App.State.get();
    var sunEventDate = new Date(state.forecast.recommendedTime).toDateString();
    return sunEventDate;
  }

  return {
    recommendedTime: convertTime,
    recommendedDate: convertDate
  }

})(jQuery);
