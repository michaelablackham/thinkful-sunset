var App = App || {};

App.Colors = (function($) {
  'use strict';

  var colors = [
  //  '#362a3c',
  //  '#282269',
  //  '#224369',
  //  '#226869,',
  //  '#226939',
  //  '#69a736',
  //  '#bba132',
  //  '#bb7a32',
  //  '#a91c1c',
  //  '#af0259'
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
    var newColor = colors[colorWarmth];

    return newColor
  }


  return {
    color: renderColor
  }

})(jQuery);
