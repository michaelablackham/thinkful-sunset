var App = App || {};

App.State = (function ($) {
  var state = {
    location: '',
    coords: null,
    sunType: '',
    forecast: null,
    currentPage: 'pageHome',
    loadingText: null
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
