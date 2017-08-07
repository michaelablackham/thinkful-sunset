$(function() {
  'use strict';

  App.State.addObserver(App.Results);

  App.Geolocation.locationAvailable();
  App.EventListeners.homeButton();
  App.EventListeners.menuButton();
  App.EventListeners.useCurrent();
  App.State.get();
  App.Form.submit();
});
