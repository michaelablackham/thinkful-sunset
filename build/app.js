var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"]').submit(function (ev) {
      ev.preventDefault();

      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();

      App.Prediction.get({
        type: sunVal,
        address: locationVal
      })
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

  App.EventListeners.useCurrent();
  App.State.get();
  App.Form.submit();
});

var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  function useCurrentLocation() {
    $(".current-location").click(function(){
      App.Geolocation.getLocation();
    });
  }

  return {
    useCurrent: useCurrentLocation
  }

})(jQuery);

var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'http://sunset-api.herokuapp.com'

  function getPrediction (params) {
    return jQuery.ajax({
      async: true,
      url: API_BASE_URL + '/predict',
      data: {
        type: params.type,
        address: params.address
      },
      dataType: 'json',
      type: 'GET'
    });

    console.log(prediction.type);
  }

  return {
    get: getPrediction
  }
})(jQuery);

var App = App || {};

App.Render = (function($) {
  'use strict';

  var SECTION_ELEMENTS = {};

  // set the initial currentPage
  function setCurrentPage(newCurrentPage) {
    App.State.set({currentPage: newCurrentPage});
  }

  function renderSunevent() {
    // Renders the app
    var state = App.State.get();

    // default to hiding all current page, then show the currentpage
    Object.keys(SECTION_ELEMENTS).forEach(function (currentPage) {
      SECTION_ELEMENTS[currentPage].hide();
    });

    // SHOW THE CURRENT PAGE
    SECTION_ELEMENTS[state.currentPage].show();

    //SWITCH TO SHOW THE NEW PAGE and run that pages' function
    switch (state.currentPage) {
      case 'pageHome':
        App.Start.renderStartPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      default:
        throw new Error('Unexpected page.');
    }
  }

  $(function () {
    Object.assign(SECTION_ELEMENTS, {
      pageHome: $('#page-home')

    });
  });

  return {
    renderSunevent: renderSunevent,
    setCurrentPage: setCurrentPage
  };

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
