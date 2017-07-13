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
