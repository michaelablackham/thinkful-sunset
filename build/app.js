var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"]').submit(function (ev) {
      ev.preventDefault();

      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();
      App.State.set({
        location: locationVal,
        sunType: sunVal
      });

      console.log(App.State.get());
    });
  }

  return {
    submit: submitForm
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

  App.State.addObserver(App.Results);

  App.State.get();
  App.Form.submit();
});

var App = App || {};

App.Results = (function($) {
  'use strict';

  var HEADING_TEMPLATE = '<h2>@sunEvent Forecast for @location.</h2>';

  function renderResults() {
    var state = App.State.get();
    $('#page-results').show();
    var newHeading = HEADING_TEMPLATE
      .replace('@sunEvent', state.sunType)
      .replace('@location', state.location);
    $('#page-results').html(newHeading)
  }

  function update () {
    renderResults();
  }

  return {
    render: renderResults,
    update: update
  }

})(jQuery);

var App = App || {};

App.State = (function ($) {
  var state = {
    location: '', //city state given for search
    sunType: '', // sunset or sunrise
    forecast: null
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
