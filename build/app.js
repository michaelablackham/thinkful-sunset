var App = App || {};

App.HomePage = (function ($) {

  function renderHomePage(){
    $('body').removeClass('resultsPage');
  }

  return {
    render: renderHomePage
  };
})(jQuery);

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
    //render background-gradient of results page based on quality percent
    var state = App.State.get();
    var qualityPercent = state.forecast.qualityPercent;
    var colorWarmth = Math.round(qualityPercent/10) - 1;
    if (colorWarmth < 0) {
      var newColor = colors[0];
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
    //convert exported time to local time
    var state = App.State.get();
    var recommendedTime = new Date(state.forecast.recommendedTime)
      .toLocaleTimeString()
      .replace(/(\d+:\d+).+(AM|PM)/, '$1 $2');
    return recommendedTime;
  }

  function convertToDOW() {
    //convert number day of week to text day of week
    var state = App.State.get();
    var sunEventDOW = new Date(state.forecast.recommendedTime).getDay();
    var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayOfWeek[sunEventDOW];
  }
  function convertToMonth() {
    //convert number month to text month
    var state = App.State.get();
    var sunEventToMonth = new Date(state.forecast.recommendedTime).getMonth();
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month[sunEventToMonth];
  }
  function convertToDate() {
    //convert number day of the month to text day of the month
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

var App = App || {};

App.Form = (function($) {
  'use strict';

  function submitForm() {
    $('form[name="location"], form[name="locationToggle"]').submit(function (ev) {
      ev.preventDefault();

      //Get Values of all inputs
      var locationVal = $(ev.target).parent().find('.sunset-location').val();
      var coordsVal = $(ev.target).parent().find('.sunset-coords').val();
      var sunVal = $(ev.target).parent().find('.sun-event:checked').val();
      //Set the loading screen text and fire loading screen
      App.State.set({loadingText: 'Getting ' + sunVal + ' Prediction'});
      App.EventListeners.loadingScreen();

      //Send HTTP Request for multiple queries
      App.Prediction.get({
        type: sunVal,
        address: locationVal,
        coords: coordsVal
      })
      //Set state based on response from API server
      .then(function (payload) {
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
      //When successful, send state to results page
      .then(function() {
        var state = App.State.get();
        if (state.currentPage === 'pageHome') {
          App.Render.setCurrentPage('pageResults');
        }
      })
      //Render results page
      .then(function() {
        App.Render.renderSunEvent();
      })
      //Catch for any errors
      .catch(function() {
        alert('Oops! Looks like something went wrong..');
        App.EventListeners.loadingScreen();
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
    App.EventListeners.loadingScreen();
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(pos) {
    var pos = pos.coords;
    App.EventListeners.loadingScreen();
    $('.sunset-location').val('Current Location');
    $('.sunset-coords').val(pos.longitude + ',' + pos.latitude);
  };

  function error(err) {
    App.EventListeners.loadingScreen();
  };

  function geolocationAvailable() {
    if ("geolocation" in navigator) {
      $('.location-wrapper').addClass('coordinates');
    } else {
      console.log("no location")
    }
  }

  return {
    getLocation: getLocation,
    locationAvailable: geolocationAvailable
  }

  })(jQuery);

var App = App || {};

App.Icons = (function ($) {

  function renderSunrise() {
    var sunriseIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sunset" viewBox="0 0 32.4 28.8"> <path fill="#ffffff"  d="M1 16.1c0-0.3 0.1-0.6 0.4-0.8C1.6 15.1 1.9 15 2.3 15h2.9c0.3 0 0.6 0.1 0.8 0.3s0.3 0.5 0.3 0.8c0 0.4-0.1 0.6-0.3 0.9s-0.5 0.4-0.8 0.4H2.3c-0.3 0-0.6-0.1-0.9-0.4S1 16.5 1 16.1zM5.2 6.3c0-0.4 0.1-0.6 0.3-0.8C5.7 5.2 6 5.1 6.3 5.1c0.4 0 0.6 0.1 0.8 0.4l2 2c0.6 0.5 0.6 1.1 0 1.7C9 9.4 8.7 9.6 8.4 9.6c-0.3 0-0.6-0.1-0.8-0.4l-2.1-2C5.3 6.9 5.2 6.7 5.2 6.3zM7.6 22.9c0-0.3 0.1-0.6 0.4-0.9 0.2-0.2 0.5-0.3 0.8-0.3h4c0.1 0 0.2 0 0.4 0.1l2.9 2.8 3-2.8c0.1-0.1 0.2-0.1 0.4-0.1h4.1c0.3 0 0.6 0.1 0.9 0.4s0.4 0.5 0.4 0.9 -0.1 0.6-0.4 0.9 -0.5 0.4-0.9 0.4h-3.4l-3.9 3.6c-0.2 0.1-0.3 0.1-0.4 0l-3.9-3.6H8.8c-0.3 0-0.6-0.1-0.9-0.4S7.6 23.2 7.6 22.9zM9.4 13.3c-0.4 0.9-0.6 1.9-0.6 2.9 0 1.2 0.2 2.3 0.7 3.3 0.1 0.1 0.2 0.2 0.3 0.2h2.3c0.1 0 0.2 0 0.2-0.1s0-0.1-0.1-0.2c-0.7-0.9-1.1-2-1.1-3.2 0-1.4 0.5-2.5 1.5-3.5s2.2-1.4 3.6-1.4c1.4 0 2.6 0.5 3.5 1.5s1.5 2.1 1.5 3.5c0 1.2-0.4 2.2-1.1 3.2C20 19.4 20 19.5 20 19.5s0.1 0.1 0.2 0.1h2.4c0.2 0 0.3-0.1 0.3-0.2 0.5-1 0.8-2.1 0.8-3.3 0-1-0.2-1.9-0.6-2.9s-0.9-1.7-1.6-2.4S20 9.7 19.1 9.3s-1.9-0.6-2.9-0.6 -2 0.2-2.9 0.6 -1.7 0.9-2.4 1.6S9.8 12.4 9.4 13.3zM15 5.1V2.2c0-0.3 0.1-0.6 0.4-0.9S15.9 1 16.2 1s0.6 0.1 0.9 0.4 0.4 0.5 0.4 0.9v2.9c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4S15.6 6.2 15.3 6 15 5.5 15 5.1zM22.8 8.4c0-0.4 0.1-0.6 0.3-0.8l2-2c0.2-0.2 0.5-0.4 0.8-0.4 0.3 0 0.6 0.1 0.9 0.4s0.3 0.5 0.3 0.9c0 0.4-0.1 0.6-0.3 0.8l-2.1 2c-0.3 0.2-0.6 0.4-0.9 0.4 -0.3 0-0.6-0.1-0.8-0.3S22.8 8.7 22.8 8.4zM26.1 16.1c0-0.3 0.1-0.6 0.3-0.8s0.5-0.3 0.8-0.3h2.9c0.3 0 0.6 0.1 0.9 0.3s0.4 0.5 0.4 0.8c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-2.9c-0.3 0-0.6-0.1-0.8-0.4S26.1 16.5 26.1 16.1z"/></svg>';

    var iconHtml = $(sunriseIcon).html();

    return iconHtml;
  }

  function renderSunset() {
    var sunsetIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sunrise" viewBox="0 0 32.4 28.8"><path fill="#ffffff" d="M0.9 17c0-0.3 0.1-0.6 0.4-0.9 0.3-0.2 0.6-0.4 0.9-0.4H5c0.3 0 0.6 0.1 0.8 0.4s0.3 0.5 0.3 0.9c0 0.4-0.1 0.7-0.3 0.9S5.4 18.3 5 18.3H2.1c-0.3 0-0.6-0.1-0.9-0.4S0.9 17.3 0.9 17zM5 7c0-0.3 0.1-0.6 0.3-0.9 0.3-0.2 0.6-0.4 0.9-0.4 0.3 0 0.6 0.1 0.9 0.4l2.1 2.1c0.2 0.3 0.4 0.6 0.4 0.9 0 0.4-0.1 0.6-0.3 0.9s-0.5 0.4-0.8 0.4c-0.3 0-0.6-0.1-0.9-0.4l-2.1-2C5.1 7.7 5 7.4 5 7zM7.5 23.9c0-0.4 0.1-0.6 0.4-0.9 0.2-0.2 0.5-0.3 0.9-0.3H12l3.9-3.7c0.1-0.1 0.3-0.1 0.4 0l3.9 3.7h3.5c0.3 0 0.6 0.1 0.9 0.3s0.4 0.5 0.4 0.8c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-4.2c-0.1 0-0.2 0-0.4-0.1l-3-2.8 -3 2.8c-0.1 0.1-0.2 0.1-0.4 0.1H8.8c-0.3 0-0.6-0.1-0.9-0.4S7.5 24.2 7.5 23.9zM8.7 17c0 1.2 0.3 2.3 0.8 3.3 0 0.1 0.1 0.2 0.3 0.2h2.4c0.1 0 0.2 0 0.2-0.1s0-0.1 0-0.2c-0.8-1-1.2-2-1.2-3.2 0-1.4 0.5-2.6 1.5-3.6s2.2-1.5 3.6-1.5c1.4 0 2.6 0.5 3.6 1.5s1.5 2.2 1.5 3.6c0 1.2-0.4 2.2-1.2 3.2 -0.1 0.1-0.1 0.2 0 0.2s0.1 0.1 0.2 0.1h2.4c0.2 0 0.3-0.1 0.3-0.2 0.5-1 0.8-2.1 0.8-3.3 0-1-0.2-2-0.6-2.9s-0.9-1.7-1.6-2.4 -1.5-1.2-2.4-1.6 -1.9-0.6-2.9-0.6c-1 0-2 0.2-2.9 0.6s-1.7 0.9-2.4 1.6 -1.2 1.5-1.6 2.4S8.7 16 8.7 17zM15 5.8V2.9c0-0.4 0.1-0.7 0.4-0.9s0.5-0.3 0.9-0.3c0.4 0 0.6 0.1 0.9 0.4s0.3 0.5 0.3 0.9v2.9c0 0.4-0.1 0.7-0.3 0.9S16.6 7 16.2 7c-0.4 0-0.7-0.1-0.9-0.3S15 6.2 15 5.8zM22.9 9.1c0-0.3 0.1-0.6 0.3-0.9l2-2.1c0.2-0.2 0.5-0.4 0.9-0.4s0.6 0.1 0.9 0.4 0.4 0.5 0.4 0.9c0 0.4-0.1 0.7-0.3 0.9l-2.1 2c-0.3 0.2-0.6 0.4-0.9 0.4 -0.3 0-0.6-0.1-0.8-0.3S22.9 9.5 22.9 9.1zM26.2 17c0-0.3 0.1-0.6 0.3-0.9s0.5-0.4 0.8-0.4h2.9c0.3 0 0.6 0.1 0.9 0.4s0.4 0.5 0.4 0.9c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-2.9c-0.3 0-0.6-0.1-0.8-0.4S26.2 17.4 26.2 17z"/></svg>';

    var iconHtml = $(sunsetIcon).html();

    return iconHtml;
  }

  return {
    sunrise: renderSunrise,
    sunset: renderSunset
  };
})(jQuery);

//   var BASE_URL = 'https://sunsetwx.com/'
//   var REG_KEY = '0OdKkau61SPKMU0GcLfPz9cI';
//   var ENPOINT = '/v1/register';
//   var PASSWORD = "B13b18a2"


$(function() {
  'use strict';

  App.State.addObserver(App.Results);

  App.Geolocation.locationAvailable();
  App.EventListeners.homeButton();
  App.EventListeners.menuButton();
  App.EventListeners.useCurrent();
  App.State.get();
  App.Form.submit();
});

var App = App || {};

App.EventListeners = (function($) {
  'use strict';

  function useCurrentLocation() {
    $('.current-location').click(function(ev){
      ev.preventDefault();
      App.State.set({loadingText: 'Getting Current Location'});
      App.Geolocation.getLocation();
      $('#location').removeAttr('required');
    });
  }

  function clearForm() {
    $('.clear').click(function(ev){
      $('#location').attr('required', true);
      $('input[type="text"]').val("");
    });
  }

  function homeButton() {
    $('.button-home').click(function() {
      App.Reset.resetPage();
    });
  }

  function toggleButton() {
    $('.button-menu').click(function() {
      toggleForm();
    });
  }

  function toggleForm() {
    $('.resultsPage--toggle-form').toggleClass('active');
    $('.button-menu').toggleClass('active');
  }

  function loadingScreen() {
    if ($('.loading-screen').hasClass('active')) {
      $('.loading-screen').removeClass("active");
    }
    else {
      var state = App.State.get();
      $('.loading-screen').addClass("active");
      $('.loading-screen').find('h2').text(state.loadingText);
    }
  }

  return {
    useCurrent: useCurrentLocation,
    homeButton: homeButton,
    menuButton: toggleButton,
    toggleMenu: toggleForm,
    loadingScreen: loadingScreen
  }

})(jQuery);

var App = App || {};

App.Prediction = (function ($) {
  'use strict';

  var API_BASE_URL = 'https://sunset-api.herokuapp.com'

  function getPrediction (params) {
    var queryParams = {
      type: params.type
    }

    //Only use if coordinates are used instead of input for city st
    params.coords
      ? queryParams.coords = params.coords
      : queryParams.address = params.address

    return jQuery.ajax({
      async: true,
      url: API_BASE_URL + '/predict',
      data: queryParams,
      dataType: 'json',
      type: 'GET'
    })
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

    SECTION_ELEMENTS[state.currentPage].show();

    //SWITCH TO SHOW THE NEW PAGE and run that pages' function
    switch (state.currentPage) {
      case 'pageHome':
        App.HomePage.render(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageResults':
        App.Results.render(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      default:
        throw new Error('Unexpected page.');
    }
    console.log(state)
  }

  function renderCurrentPage() {
    SECTION_ELEMENTS[state.currentPage].show();
  }

  $(function () {
    Object.assign(SECTION_ELEMENTS, {
      pageHome: $('#page-home'),
      pageResults: $('#page-results')
    });
  });

  return {
    renderSunEvent: renderSunevent,
    setCurrentPage: setCurrentPage,
    renderCurrentPage: renderCurrentPage
  };

})(jQuery);

var App = App || {};

App.Reset = (function ($) {
  'use strict';

  function resetPage (params) {
    App.State.set({
      sunType: "",
      location: "",
      forecast: null,
      currentPage: 'pageHome'
    });

    App.Render.setCurrentPage('pageHome');
    App.Render.renderSunEvent();
    $('.sunset-location').val("");
  }

  return {
    resetPage: resetPage
  }
})(jQuery);

var App = App || {};

App.Results = (function($) {
  'use strict';

  var SUNSET_TEMPLATE = '<img src="../src/images/@sunEvent.svg" alt="@sunEvent"/>';
  var LOCATION_TEMPLATE = '<h2 class="heading-location"><i class="fa fa-location-arrow" aria-hidden="true"></i> @location</h2>';
  var DATE_TEMPLATE = '<h2 class="heading-date">@dow, @month @date</h2>';
  var QUALITY_TEMPLATE = '<h3 class="quality--percent">@qualityPercent%</h3>';
  var EXTRA_INFO_TEMPLATE = '<table> <tbody>' +
    '<tr><th colspan="2"><div class="flex">@sunIcon @sunEvent</div></th></tr>' +
    '<tr><td>Quality</td><td>@qualityString</td></tr>' +
    '<tr><td>Time</td><td> @time</td></tr>' +
    '<tr><td>Temperature</td><td>@temp<sup>&deg;F</sup></td></tr>' +
    '</tbody> </table>';
  var SUN_BACKGROUND = '<span class="sun @color-class"></span>';

  function updateTemplates() {
    var state = App.State.get();

    if (!state.forecast) {
      return;
    }

    function sunIcon() {
      var sunIcon = state.sunType.toLowerCase();
      var sunIcon = SUNSET_TEMPLATE
        .replace('@sunEvent', sunIcon)
        .replace('@sunEvent', sunIcon);
      return sunIcon;
    }

    var newLocation = LOCATION_TEMPLATE
      .replace('@location', state.location);

    var newDate = DATE_TEMPLATE
      .replace('@dow', App.ConvertTime.recommendedDOW())
      .replace('@month', App.ConvertTime.recommendedMonth())
      .replace('@date', App.ConvertTime.recommendedDate());

    var newQuality = QUALITY_TEMPLATE
      .replace('@qualityPercent', Math.round(state.forecast.qualityPercent));

    var newQualityInfo = EXTRA_INFO_TEMPLATE
      .replace('@sunIcon', sunIcon())
      .replace('@sunEvent', state.sunType)
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@time', App.ConvertTime.recommendedTime());

    var sunBackground = SUN_BACKGROUND.replace('@color-class',App.Colors.color());

    $('#page-results .page-results--content').html(sunBackground + newDate + newLocation + newQuality + newQualityInfo);
  }

  function renderResults() {
    if (!$('body').hasClass('resultsPage')){
      $('body').addClass('resultsPage');
    }
    App.EventListeners.loadingScreen();
    updateTemplates();
    $('input[type="text"]').val("");
  }

  return {
    update: updateTemplates,
    render: renderResults
  }

})(jQuery);

var App = App || {};

App.State = (function ($) {
  var state = {
    location: '', //city state given for search
    coords: null,
    sunType: '', // sunset or sunrise
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

var App = App || {};

App.ConvertTemp = (function($) {
  'use strict';

  function celsiusToFahrenheit() {
    //Convert celsius to Fahrenheit
    var state = App.State.get();
    var currentTemp = state.forecast.temperature;
    return Math.round(currentTemp * 9 / 5 + 32);
  }

  return {
    fahrenheit: celsiusToFahrenheit
  }

})(jQuery);
