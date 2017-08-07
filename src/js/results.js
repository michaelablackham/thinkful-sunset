var App = App || {};

App.Results = (function($) {
  'use strict';

  // var SUNSET_TEMPLATE = '<img src="../src/images/@sunEvent.svg" alt="@sunEvent"/>';
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

    // function sunIcon() {
    //   if () {
    //     sunIcon
    //   }
    //   var sunIcon = SUNSET_TEMPLATE
    //     .replace('@sunEvent', state.sunType)
    //     .replace('@sunEvent', state.sunType);
    //   return sunIcon;
    // }

    function renderIcon() {
      var state = App.State.get();
      if (state.sunType === 'sunset') {
        App.Icons.sunset();
        console.log(App.Icons.sunset())
      }
      else {
        App.Icons.sunrise();
        console.log(App.Icons.sunrise())
      }
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
      .replace('@sunIcon', renderIcon())
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@time', App.ConvertTime.recommendedTime());

    var sunBackground = SUN_BACKGROUND.replace('@color-class',App.Colors.color());

    $('#page-results').html(App.ToggleForm.cloneMenu() + sunBackground + newDate + newLocation + newQuality + newQualityInfo);
  }

  function renderResults() {
    if ($('body').hasClass('resultsPage')){
      $('#page-results').html("");
      return;
    }
    else {
      $('body').addClass('resultsPage');
    }
    updateTemplates();
    App.EventListeners.loadingScreen();
  }

  return {
    update: updateTemplates,
    render: renderResults
  }

})(jQuery);
