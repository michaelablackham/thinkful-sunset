var App = App || {};

App.State = (function ($) {
  var state = {
    location: '', //city state given for search
    sunType: '', // sunset or sunrise
    forecast: null,
    currentPage: 'pageHome',
    // forecast: {
    //   temperature: '', //convert from C to F
    //   recommendedTime: '', //recommended time for sunset/sunrise
    //   officialTime: '', //official time of sunset/sunrise
    //   qualityPercent: '', //% 0-100 of quality of sunrise/sunset
    //   qualityString: '' //% quality of sunrise/sunset in word
    // }
  };

  var observers = []

  function getState() {
    return state;
  }

  function setState(newState) {
    Object.assign(state, newState);
    notify(state);
  }

  function addObserver(observer) {
    observers.push(observer);
  }

  function notify(context) {
    observers.forEach(function (observer) {
      observer.update(context);
    });
  }

  return {
    get: getState,
    set: setState,
    addObserver: addObserver
  };
})(jQuery);
