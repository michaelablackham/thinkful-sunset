var App = App || {};

App.Render = (function($) {
  'use strict';

  var SECTION_ELEMENTS = {};

  // set the initial currentPage
  function setCurrentPage(newCurrentPage) {
    App.State.set({currentPage: newCurrentPage});
  }

  function renderSunevent() {
    // Renders the app
    var state = App.State.get();

    // default to hiding all current page, then show the currentpage
    Object.keys(SECTION_ELEMENTS).forEach(function (currentPage) {
      SECTION_ELEMENTS[currentPage].hide();
    });

    SECTION_ELEMENTS[state.currentPage].show();

    //SWITCH TO SHOW THE NEW PAGE and run that pages' function
    switch (state.currentPage) {
      case 'pageHome':
        App.HomePage.render(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageResults':
        App.Results.render(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      default:
        throw new Error('Unexpected page.');
    }
  }

  function renderCurrentPage() {
    SECTION_ELEMENTS[state.currentPage].show();
  }

  $(function () {
    Object.assign(SECTION_ELEMENTS, {
      pageHome: $('#page-home'),
      pageResults: $('#page-results')
    });
  });

  return {
    renderSunEvent: renderSunevent,
    setCurrentPage: setCurrentPage,
    renderCurrentPage: renderCurrentPage
  };

})(jQuery);
