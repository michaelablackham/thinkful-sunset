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

  // function defaultEvent() {
  //   var state = App.State.get();
  //   recommendedHours = new Date(state.forecast.recommendedTime).getHours();
  //   recommendedMinutes = new Date(state.forecast.recommendedTime).getMinutes();
  //   currentHours = new Date().getHours();
  //   currentMinutes = new Date().getMinutes();
  // }

  return {
    recommendedTime: convertTime,
    recommendedDate: convertDate
    // defaultEvent: defaultEvent
  }

})(jQuery);
