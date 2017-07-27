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

  return {
    recommendedTime: convertTime,
    recommendedDate: convertDate
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

      App.Prediction.get({
        type: sunVal,
        address: locationVal
      })
      .then(function (payload) {
        console.log('payload', payload);
        App.State.set({
          sunType: payload.prediction.type,
          location: locationVal,
          forecast: {
            qualityPercent: payload.prediction.quality_percent,
            qualityString: payload.prediction.quality,
            recommendedTime: payload.prediction.recommended_time,
            temperature: payload.prediction.temperature
          }
        })
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

  function getAboutInformation() {
    $(".about-sunset").click(function(){
      console.log("about section");
    });
  }

  return {
    useCurrent: useCurrentLocation
  }

})(jQuery);

var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'https://sunset-api.herokuapp.com'

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
    })
      // .then(function (payload) {
      //   // console.log('payload', payload);
      //   App.State.set(
      //     { forecast: {
      //         qualityPercent: payload.prediction.quality_percent,
      //         qualityString: payload.prediction.quality,
      //         recommendedTime: payload.prediction.recommended_time,
      //         temperature: payload.prediction.temperature
      //       }
      //     }
      //   )
      //   // return payload.quality;
      //   console.log(App.State.get())
      // })
      // .then(function (quality) {
        // console.log('quality', prediction.quality);
      // })
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

  var HEADING_TEMPLATE = '<h2>@sunEvent Forecast for @location on @date.</h2>';
  var QUALITY_TEMPLATE = '<h3 style="quality--percent">@qualityPercent%</h3>'+
    '<h3 class="quality--string">@qualityString<h3>' +
    '<h4 class="temperature">@temp<sup>&deg;F</sup></h4>' +
    '<h4 class="time">@time</h4>';

  function renderResults() {
    var state = App.State.get();

    if (!state.forecast) {
      return;
    }

    $('body').toggleClass('resultsPage');
    $('#page-home').hide();
    $('#page-results').show();

    var newHeading = HEADING_TEMPLATE
      .replace('@sunEvent', state.sunType)
      .replace('@location', state.location)
      .replace('@date', App.ConvertTime.recommendedDate());

    var newQuality = QUALITY_TEMPLATE
      .replace('@qualityPercent', state.forecast.qualityPercent)
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@time', App.ConvertTime.recommendedTime());

    $('#page-results').html(newHeading + newQuality);

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
    currentPage: 'pageHome'
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

var App = App || {};

App.ConvertTemp = (function($) {
  'use strict';

  function celsiusToFahrenheit() {
    var state = App.State.get();
    var currentTemp = state.forecast.temperature;
    return Math.round(currentTemp * 9 / 5 + 32);
  }

  return {
    fahrenheit: celsiusToFahrenheit
  }

})(jQuery);
