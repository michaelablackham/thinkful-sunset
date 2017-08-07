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
        $('.resultsPage--toggle-form, .button-menu').removeClass('active');
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
    if ('geolocation' in navigator) {
      $('.location-wrapper').addClass('coordinates');
    }
  }

  return {
    getLocation: getLocation,
    locationAvailable: geolocationAvailable
  }

  })(jQuery);

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
      $('input[type="text"]').val('');
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
      $('.loading-screen').removeClass('active');
    }
    else {
      var state = App.State.get();
      $('.loading-screen').addClass('active');
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
      sunType: '',
      location: '',
      forecast: null,
      currentPage: 'pageHome'
    });

    App.Render.setCurrentPage('pageHome');
    App.Render.renderSunEvent();
    $('.sunset-location').val('');
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
    '</tbody> </table>' +
    '<p class="disclaimer">*A higher percentage relates to a more vibrant @sunEvent.</p>';
  var SUN_BACKGROUND = '<span class="sun @color-class"></span>';

  function updateTemplates() {
    var state = App.State.get();

    if (!state.forecast) {
      return;
    }

    var suneventIcon = state.sunType.toLowerCase();

    function sunIcon() {
      var sunIcon = SUNSET_TEMPLATE
        .replace('@sunEvent', suneventIcon)
        .replace('@sunEvent', suneventIcon);
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
      .replace('@time', App.ConvertTime.recommendedTime())
      .replace('@sunEvent', suneventIcon);

    var sunBackground = SUN_BACKGROUND.replace('@color-class',App.Colors.color());

    $('#page-results .page-results--content').html(sunBackground + newDate + newLocation + newQuality + newQualityInfo);
  }

  function renderResults() {
    if (!$('body').hasClass('resultsPage')){
      $('body').addClass('resultsPage');
    }
    App.EventListeners.loadingScreen();
    updateTemplates();
    $('input[type="text"]').val('');
  }

  return {
    update: updateTemplates,
    render: renderResults
  }

})(jQuery);

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
