var App = App || {};

App.Form = (function($) {
  'use strict';

  function renderForm() {

  }

  return {
    submitForm: submitForm
  }

})(jQuery);

// $(function() {
//   'use strict';
//
//   var BASE_URL = 'https://sunsetwx.com/'
//   var REG_KEY = '0OdKkau61SPKMU0GcLfPz9cI';
//   var ENPOINT = '/v1/register';
//   var PASSWORD = "B13b18a2"
//
//   console.log("hello world!")
//
// }
// });

$(function() {
  'use strict';

  $(function () {
    // App.State.get();
    App.Form.renderForm();
  });
});

var App = App || {};

App.State = (function ($) {
  var state = {
    location: '', //city state given for search
    sunType: '', // sunset or sunrise
    temperature: '', //convert from C to F
    recommendedTime: '', //recommended time for sunset/sunrise
    officialTime: '', //official time of sunset/sunrise
    qualityPercent: '', //% 0-100 of quality of sunrise/sunset
    qualityString: '' //% quality of sunrise/sunset in word
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
