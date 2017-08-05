var App = App || {};

App.ToggleForm = (function($) {
  'use strict';

  function cloneForm() {
    $('#page-home .template-form').clone();
  }

  function toggleForm() {
    console.log("toggling form");
  }


  return {
    cloneForm: cloneForm,
    toggleMenu: toggleForm
  }

})(jQuery);
