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
