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

  function defaultEvent() {
    var state = App.State.get();
    console.log ('recommended time' + new Date(state.forecast.recommendedTime).getHours());
    console.log ('current time' + new Date().getHours());
    // if (state.forecast.recommendedTime <= )
  }

  return {
    recommendedTime: convertTime,
    recommendedDate: convertDate,
    defaultEvent: defaultEvent
  }

})(jQuery);
