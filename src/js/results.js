var App = App || {};

App.Results = (function($) {
  'use strict';

  var HEADING_TEMPLATE = '<h2>@sunEvent Forecast for @location.</h2>';
  var QUALITY_TEMPLATE = '<h3>@qualityPercent%</h3>'+
    '<h4>@qualityString<h4>';

  function renderResults() {
    var state = App.State.get();

    if (!state.forecast) {
      return;
    }

    $('#page-results').show();

    var newHeading = HEADING_TEMPLATE
      .replace('@sunEvent', state.sunType)
      .replace('@location', state.location);
    var newQuality = QUALITY_TEMPLATE
      .replace('@qualityPercent', state.forecast.qualityPercent)
      .replace('@qualityString', state.forecast.qualityString)
      
    $('#page-results').html(newHeading + newQuality)

  }

  function update () {
    renderResults();
  }

  return {
    render: renderResults,
    update: update
  }

})(jQuery);
