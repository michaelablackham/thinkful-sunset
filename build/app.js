var App = App || {};

App.Colors = (function($) {
  'use strict';

  var colors = [
    'low10',
    'low20',
    'low30',
    'mid40',
    'mid50',
    'mid60',
    'mid70',
    'high80',
    'high90',
    'high100'
  ];

  function renderColor() {
    var state = App.State.get();
    var qualityPercent = state.forecast.qualityPercent;
    var colorWarmth = Math.round(qualityPercent/10) - 1;
    if (colorWarmth < 0) {
      var newColor = colors[0];
      console.log('0')
    }
    else {
      var newColor = colors[colorWarmth];
    }

    return newColor
  }


  return {
    color: renderColor
  }

})(jQuery);

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

  function defaultEvent() {
    var state = App.State.get();
    console.log ('recommended time' + new Date(state.forecast.recommendedTime).getHours());
    console.log ('current time' + new Date().getHours());
    // if (state.forecast.recommendedTime <= )
  }

  return {
    recommendedTime: convertTime,
    recommendedDate: convertDate,
    defaultEvent: defaultEvent
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

var App = App || {};

App.Icons = (function($) {
  'use strict';

  function sunsetIcon() {
    var sunsetIcon = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.74 63.21">' +
    '<title>sunset</title>' +
    '<path d="M1.29,40.89a2.85,2.85,0,0,1,1-2.32,3.06,3.06,0,0,1,2.32-.84h7.8a3.07,3.07,0,0,1,3.16,3.16,3.18,3.18,0,0,1-.91,2.29,3,3,0,0,1-2.25.95H4.63a3.27,3.27,0,0,1-2.36-.95A3.06,3.06,0,0,1,1.29,40.89ZM4.77,59.94a3.14,3.14,0,0,1,1-2.29A3.17,3.17,0,0,1,8,56.78H76.32a3.22,3.22,0,0,1,2.32.91,3,3,0,0,1,.95,2.25,3.3,3.3,0,0,1-3.27,3.27H8a3.14,3.14,0,0,1-2.3-1A3.14,3.14,0,0,1,4.77,59.94Zm7.66-45.63a2.79,2.79,0,0,1,.88-2.21,3,3,0,0,1,2.32-1,3,3,0,0,1,2.29,1l5.41,5.48a3,3,0,0,1,1,2.25,3.12,3.12,0,0,1-.9,2.3,3.07,3.07,0,0,1-2.27.9,3.29,3.29,0,0,1-2.25-.91l-5.59-5.52A2.88,2.88,0,0,1,12.44,14.31Zm9.74,26.58a18.75,18.75,0,0,0,2,8.75q.18.53.91.53h6.26c.28,0,.45-.08.51-.23s0-.36-.26-.62a13.36,13.36,0,0,1,1-18,13.17,13.17,0,0,1,9.56-3.94,13.47,13.47,0,0,1,13.5,13.46,12.86,12.86,0,0,1-3,8.44,1.31,1.31,0,0,0-.21.46.26.26,0,0,0,.11.28.63.63,0,0,0,.39.11h6.36a.86.86,0,0,0,.77-.53,18.37,18.37,0,0,0,2.11-8.75,19.45,19.45,0,0,0-2.71-10,20.18,20.18,0,0,0-7.33-7.33,19.83,19.83,0,0,0-20,0,20,20,0,0,0-7.31,7.33A19.55,19.55,0,0,0,22.18,40.89ZM38.95,11.14V3.3A3.23,3.23,0,0,1,39.89,1a3.06,3.06,0,0,1,2.29-1A3.18,3.18,0,0,1,44.5,1a3.18,3.18,0,0,1,1,2.32v7.84a3.36,3.36,0,0,1-3.3,3.3,3.06,3.06,0,0,1-2.29-1A3.23,3.23,0,0,1,38.95,11.14ZM60,19.83A3,3,0,0,1,61,17.58l5.41-5.48a3,3,0,0,1,2.32-1A3.17,3.17,0,0,1,71,12a3.13,3.13,0,0,1,.93,2.3,3.09,3.09,0,0,1-.84,2.29l-5.66,5.52a3.15,3.15,0,0,1-2.21.84A3,3,0,0,1,60,19.83Zm8.72,21.06a3,3,0,0,1,3.13-3.16h7.84a3.32,3.32,0,0,1,2.34.9,3,3,0,0,1,1,2.27,3.06,3.06,0,0,1-1,2.29,3.23,3.23,0,0,1-2.32.95H71.89a3,3,0,0,1-2.21-.95A3.17,3.17,0,0,1,68.76,40.89Z" transform="translate(-1.29)"/> '  + '</svg>';

    return sunsetIcon
  }

  function sunriseIcon() {

  }


  return {
    sunset: sunsetIcon
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

  var SUNSET_TEMPLATE = '<span class="currentIcon">@sunEvent</span>'
  var HEADING_TEMPLATE = '<h2>@sunEvent Forecast for @location on @date.</h2>';
  var QUALITY_TEMPLATE = '<h3 class="quality--percent">@qualityPercent%</h3>'+
    '<p class="quality--string">Your @sunEvent will be @qualityString quality!<p>' +
    '<h4 class="temperature">@temp<sup>&deg;F</sup></h4>' +
    '<h4 class="time">@time</h4>';
  var SUN_BACKGROUND = '<span class="sun @color-class"></span>';

  function renderResults() {
    var state = App.State.get();

    if (!state.forecast) {
      return;
    }

    $('body').addClass('resultsPage');
    $('#page-home').hide();
    $('#page-results').show();

    // if(state.sunType === "Sunset") {
    //   var newIcon = SUNSET_TEMPLATE
    //   .replace('@sunEvent', App.Icons.sunset())
    // }
    // else {
    //   console.log('sunrise')
    // }

    var newHeading = HEADING_TEMPLATE
      .replace('@sunEvent', state.sunType)
      .replace('@location', state.location)
      .replace('@date', App.ConvertTime.recommendedDate());

    var newQuality = QUALITY_TEMPLATE
      .replace('@qualityPercent', Math.round(state.forecast.qualityPercent))
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@sunEvent', state.sunType)
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@time', App.ConvertTime.recommendedTime());

      console.log(App.ConvertTime.defaultEvent())
      var sunBackground = SUN_BACKGROUND.replace('@color-class',App.Colors.color());

    $('#page-results').html(sunBackground + newHeading + newQuality);

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
