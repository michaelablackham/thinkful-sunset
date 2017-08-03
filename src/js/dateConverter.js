var App = App || {};

App.ConvertTime = (function($) {
  'use strict';

  function convertTime() {
    var state = App.State.get();
    var recommendedTime = new Date(state.forecast.recommendedTime).toLocaleTimeString();
    return recommendedTime;
  }

  function convertToDOW() {
    var state = App.State.get();
    var sunEventDOW = new Date(state.forecast.recommendedTime).getDay();
    var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayOfWeek[sunEventDOW];
  }
  function convertToMonth() {
    var state = App.State.get();
    var sunEventToMonth = new Date(state.forecast.recommendedTime).getMonth();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return month[sunEventToMonth];
  }
  function convertToDate() {
    var state = App.State.get();
    var sunEventToDate = new Date(state.forecast.recommendedTime).getDate();
    return sunEventToDate;
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
    recommendedDOW: convertToDOW,
    recommendedMonth: convertToMonth,
    recommendedDate: convertToDate
  }

})(jQuery);
