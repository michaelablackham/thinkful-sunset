var App = App || {};

App.Reset = (function ($) {
  'use strict';

  function resetPage (params) {
    App.State.set({
      sunType: '',
      location: '',
      forecast: null,
      currentPage: 'pageHome'
    });

    App.Render.setCurrentPage('pageHome');
    App.Render.renderSunEvent();
    $('.sunset-location').val('');
  }

  return {
    resetPage: resetPage
  }
})(jQuery);
