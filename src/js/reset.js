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

      $('body').removeClass('resultsPage');
      $('#page-home').show();
      $('#page-results').hide();
  }

  return {
    resetPage: resetPage
  }
})(jQuery);
