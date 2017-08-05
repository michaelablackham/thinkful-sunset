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
