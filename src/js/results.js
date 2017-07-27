var App = App || {};

App.Results = (function($) {
  'use strict';

  var SUNSET_TEMPLATE = '<span class="currentIcon">@sunEvent</span>'
  var HEADING_TEMPLATE = '<h2>@sunEvent Forecast for @location on @date.</h2>';
  var QUALITY_TEMPLATE = '<h3 style="quality--percent">@qualityPercent%</h3>'+
    '<h3 class="quality--string">@qualityString<h3>' +
    '<h4 class="temperature">@temp<sup>&deg;F</sup></h4>' +
    '<h4 class="time">@time</h4>';

  function renderResults() {
    var state = App.State.get();

    $('body').css('background-color', App.Colors.color());

    if (!state.forecast) {
      return;
    }

    $('body').toggleClass('resultsPage');
    $('#page-home').hide();
    $('#page-results').show();

    if(state.sunType === "Sunset") {
      var newIcon = SUNSET_TEMPLATE
      .replace('@sunEvent', App.Icons.sunset())
    }
    else {
      console.log('sunrise')
    }

    var newHeading = HEADING_TEMPLATE
      .replace('@sunEvent', state.sunType)
      .replace('@location', state.location)
      .replace('@date', App.ConvertTime.recommendedDate());

    var newQuality = QUALITY_TEMPLATE
      .replace('@qualityPercent', state.forecast.qualityPercent)
      .replace('@qualityString', state.forecast.qualityString)
      .replace('@temp', App.ConvertTemp.fahrenheit())
      .replace('@time', App.ConvertTime.recommendedTime());

    $('#page-results').html(newIcon + newHeading + newQuality);

  }

  function update () {
    renderResults();
  }

  return {
    render: renderResults,
    update: update
  }

})(jQuery);
