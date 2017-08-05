var App = App || {};

App.ToggleForm = (function($) {
  'use strict';

  function cloneForm() {
    var TOGGLE_FORM_TEMPLATE = '<div class="resultsPage--toggle-form template-form">@newform</div>'
    var newForm = $('#page-home .template-form').clone().html();

    var newFormTemplate = TOGGLE_FORM_TEMPLATE
      .replace('@newform', newForm);

    return newFormTemplate;
  }

  function toggleForm() {
    $('.resultsPage--toggle-form').toggleClass('active');
  }


  return {
    toggleMenu: toggleForm,
    cloneMenu: cloneForm
  }

})(jQuery);
