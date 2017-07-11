var App = App || {};

App.form = (function($) {
  'use strict';

  function submitForm(state) {
    App.State.set({
      questions: [],
      score: 0,
      currentQuestion: 0,
      lastCorrect: false,
      currentPage: 'pageStart'
    });
    $('.pager li').removeClass('current correct incorrect');
    $(".next").text("Next Question");
  }

  return {
    submitForm: submitForm
  }

})(jQuery);
