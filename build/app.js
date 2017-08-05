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

      App.EventListeners.loadingScreen();
      var locationVal = $('.sunset-location').val();
      var sunVal = $('.sun-event:checked').val();

      App.Prediction.get({
        type: sunVal,
        address: locationVal
      })
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
      .then(function(){
        App.Render.setCurrentPage('pageResults');
      })
      .then(function(){
        App.Render.renderSunEvent();
      });
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
  var geocoder;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      App.EventListeners.loadingScreen();
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   console.log(position.coords.latitude, position.coords.longitude)
      //   var latitude = position.coords.latitude;
      //   var longitude = position.coords.longitude;
      //   return latitude;
      //   return longitude;
      // });
    // } else {
    //   console.log("no location")
    }
    // getAddress(lat, lon).then(console.log).catch(console.error);

    function successFunction(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      codeLatLng(lat, lng)
      $('.loading-screen').removeClass("active");
    }

    function errorFunction(){
        alert("Geocoder failed");
        $('.loading-screen').removeClass("active");
    }

    function initialize() {
      geocoder = new google.maps.Geocoder();
    }

    function codeLatLng(lat, lng) {

      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
          if (results[1]) {
           //formatted address
           alert(results[0].formatted_address)
            //find country name
            for (var i=0; i<results[0].address_components.length; i++) {
              for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                  //this is the object you are looking for
                  city= results[0].address_components[i];
                  break;
                }
              }
            }
          //city data
          alert(city.short_name + " " + city.long_name)
          } else { alert("No results found"); }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
    };
  }

  return {
    getLocation: getLocation
  }

  })(jQuery);

//   var BASE_URL = 'https://sunsetwx.com/'
//   var REG_KEY = '0OdKkau61SPKMU0GcLfPz9cI';
//   var ENPOINT = '/v1/register';
//   var PASSWORD = "B13b18a2"


$(function() {
  'use strict';

  App.State.addObserver(App.Results);

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
    $(".current-location").click(function(){
      App.Geolocation.getLocation();
    });
  }

  function homeButton() {
    $(".button-home").click(function() {
      App.Reset.resetPage();
    });
  }

  function toggleButton() {
    $(".button-menu").click(function() {
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
      $('.loading-screen').addClass("active");
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
      ? queryParams.coords = param.coords
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
      var sunIcon = SUNSET_TEMPLATE
        .replace('@sunEvent', state.sunType)
        .replace('@sunEvent', state.sunType);
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
      .replace('@sunEvent', state.sunType)
      .replace('@sunIcon', sunIcon())
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@time', App.ConvertTime.recommendedTime());

    var sunBackground = SUN_BACKGROUND.replace('@color-class',App.Colors.color());

    $('#page-results').html(App.ToggleForm.cloneMenu() + sunBackground + newDate + newLocation + newQuality + newQualityInfo);

  }

  function renderResults() {
    $('body').addClass('resultsPage');
    updateTemplates();
    App.EventListeners.loadingScreen();
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
    //Convert celsius to Fahrenheit
    var state = App.State.get();
    var currentTemp = state.forecast.temperature;
    return Math.round(currentTemp * 9 / 5 + 32);
  }

  return {
    fahrenheit: celsiusToFahrenheit
  }

})(jQuery);

var App = App || {};

App.ToggleForm = (function($) {
  'use strict';

  function cloneForm() {
    var TOGGLE_FORM_TEMPLATE = '<div class="resultsPage--toggle-form template-form">'+
    '<form class="template-form__location flex" name="locationToggle">'+
      '<fieldset class="location flex">'+
        '<label for="location">Location *</label>'+
        '<div class="location-wrapper">'+
          '<input id="location" type="text" name="location" placeholder="City, ST" class="sunset-location" required></input>'+
          '<button class="current-location" title="get current location"><i class="fa fa-location-arrow" aria-hidden="true"></i></button>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="sunevent">'+
        '<legend>Choose to see results for sunset or sunrise</legend>'+
        '<input id="sunset2" type="radio" name="sunEvent" value="sunset" class="sun-event toggle toggle-left" checked>'+
        '<label for="sunset2" class="active btn">Sunset</label>'+
        '<input id="sunrise2" type="radio" name="sunEvent" value="sunrise" class="sun-event toggle toggle-right">'+
        '<label for="sunrise2" class="btn">Sunrise</label>'+
      '</fieldset>'+
      '<p class="disclaimer"><em>* Currently only valid for the US. Not including <strong>Alaska</strong> or <strong>Hawaii</strong></em></p>'+
      '<button title="Get Prediction" type="submit" name="submit" class="submit">Get Prediction</button>'+
    '</form>'+
    '</div>';


    return TOGGLE_FORM_TEMPLATE;
  }




  return {
    cloneMenu: cloneForm
  }

})(jQuery);
