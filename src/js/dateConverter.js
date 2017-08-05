var App = App || {};

App.ConvertTime = (function($) {
  'use strict';

  function convertTime() {
    var state = App.State.get();
    // var recommendedTime = new Date(state.forecast.recommendedTime).toLocaleTimeString();
    var recommendedTime = new Date(state.forecast.recommendedTime)
      .toLocaleTimeString()
      .replace(/(\d+:\d+).+(AM|PM)/, '$1 $2');
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
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month[sunEventToMonth];
  }
  function convertToDate() {
    var state = App.State.get();
    var sunEventToDate = new Date(state.forecast.recommendedTime).getDate();
    return sunEventToDate;
  }

  return {
    recommendedTime: convertTime,
    recommendedDOW: convertToDOW,
    recommendedMonth: convertToMonth,
    recommendedDate: convertToDate
  }

})(jQuery);
