var App = App || {};

App.Cookies = (function($) {
  'use strict';

  function allowGeolocation() {
    console.log("set cookies for 3 months")
    // Cookies.set('name', 'value', { expires: 100 });
  }

  function blockGeolocation() {
    console.log("set cookies for 24 hours")
    // Cookies.set('name', 'value', { expires: 1 });
  }

  return {
    allowGeo: allowGeolocation,
    blockGeo: blockGeolocation
  }

})(jQuery);

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

var App = App || {};

App.Geolocation = (function ($) {
  'use strict';

  function getLocation (params) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        // do_something(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("no location")
    }
  }

  return {
    getLocation: getLocation
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

  App.Geolocation.getLocation();
  App.State.get();
  App.Form.submit();
});

var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  function getPrediction (params) {
    var qualityString = ['Good', 'Poor'][Math.floor(Math.random() * 2)];
    var officialTime = new Date();
    var recommendedTime = new Date();

    (params && params.type === 'sunrise')
      ? officialTime.setHours(5)
      : officialTime.setHours(17);

    recommendedTime.setHours(officialTime.getHours());

    return Promise.resolve({
      temperature: Math.floor(Math.random() * 11 + 65), //convert from C to F
      recommendedTime: recommendedTime.toISOString(), //recommended time for sunset/sunrise
      officialTime: officialTime.toISOString(), //official time of sunset/sunrise
      qualityPercent: qualityString === 'Good' ? 75 : 25, //% 0-100 of quality of sunrise/sunset
      qualityString: qualityString //% quality of sunrise/sunset in word
    });
  }

  return {
    get: getPrediction
  }
})(jQuery);

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
