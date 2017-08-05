var App = App || {};

App.HomePage = (function ($) {

  function renderHomePage(){
    $('body').removeClass('resultsPage');
  }

  return {
    render: renderHomePage
  };
})(jQuery);
