//   var BASE_URL = 'https://sunsetwx.com/'
//   var REG_KEY = '0OdKkau61SPKMU0GcLfPz9cI';
//   var ENPOINT = '/v1/register';
//   var PASSWORD = "B13b18a2"


$(function() {
  'use strict';

  App.State.addObserver(App.Results);

  App.EventListeners.useCurrent();
  App.EventListeners.homeButton();
  App.EventListeners.menuButton();
  App.State.get();
  App.Form.submit();
});
