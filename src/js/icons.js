var App = App || {};

App.Icons = (function ($) {

  function renderSunrise() {
    var sunsetIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sunset" viewBox="0 0 32.4 28.8"> <path fill="#ffffff"  d="M1 16.1c0-0.3 0.1-0.6 0.4-0.8C1.6 15.1 1.9 15 2.3 15h2.9c0.3 0 0.6 0.1 0.8 0.3s0.3 0.5 0.3 0.8c0 0.4-0.1 0.6-0.3 0.9s-0.5 0.4-0.8 0.4H2.3c-0.3 0-0.6-0.1-0.9-0.4S1 16.5 1 16.1zM5.2 6.3c0-0.4 0.1-0.6 0.3-0.8C5.7 5.2 6 5.1 6.3 5.1c0.4 0 0.6 0.1 0.8 0.4l2 2c0.6 0.5 0.6 1.1 0 1.7C9 9.4 8.7 9.6 8.4 9.6c-0.3 0-0.6-0.1-0.8-0.4l-2.1-2C5.3 6.9 5.2 6.7 5.2 6.3zM7.6 22.9c0-0.3 0.1-0.6 0.4-0.9 0.2-0.2 0.5-0.3 0.8-0.3h4c0.1 0 0.2 0 0.4 0.1l2.9 2.8 3-2.8c0.1-0.1 0.2-0.1 0.4-0.1h4.1c0.3 0 0.6 0.1 0.9 0.4s0.4 0.5 0.4 0.9 -0.1 0.6-0.4 0.9 -0.5 0.4-0.9 0.4h-3.4l-3.9 3.6c-0.2 0.1-0.3 0.1-0.4 0l-3.9-3.6H8.8c-0.3 0-0.6-0.1-0.9-0.4S7.6 23.2 7.6 22.9zM9.4 13.3c-0.4 0.9-0.6 1.9-0.6 2.9 0 1.2 0.2 2.3 0.7 3.3 0.1 0.1 0.2 0.2 0.3 0.2h2.3c0.1 0 0.2 0 0.2-0.1s0-0.1-0.1-0.2c-0.7-0.9-1.1-2-1.1-3.2 0-1.4 0.5-2.5 1.5-3.5s2.2-1.4 3.6-1.4c1.4 0 2.6 0.5 3.5 1.5s1.5 2.1 1.5 3.5c0 1.2-0.4 2.2-1.1 3.2C20 19.4 20 19.5 20 19.5s0.1 0.1 0.2 0.1h2.4c0.2 0 0.3-0.1 0.3-0.2 0.5-1 0.8-2.1 0.8-3.3 0-1-0.2-1.9-0.6-2.9s-0.9-1.7-1.6-2.4S20 9.7 19.1 9.3s-1.9-0.6-2.9-0.6 -2 0.2-2.9 0.6 -1.7 0.9-2.4 1.6S9.8 12.4 9.4 13.3zM15 5.1V2.2c0-0.3 0.1-0.6 0.4-0.9S15.9 1 16.2 1s0.6 0.1 0.9 0.4 0.4 0.5 0.4 0.9v2.9c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4S15.6 6.2 15.3 6 15 5.5 15 5.1zM22.8 8.4c0-0.4 0.1-0.6 0.3-0.8l2-2c0.2-0.2 0.5-0.4 0.8-0.4 0.3 0 0.6 0.1 0.9 0.4s0.3 0.5 0.3 0.9c0 0.4-0.1 0.6-0.3 0.8l-2.1 2c-0.3 0.2-0.6 0.4-0.9 0.4 -0.3 0-0.6-0.1-0.8-0.3S22.8 8.7 22.8 8.4zM26.1 16.1c0-0.3 0.1-0.6 0.3-0.8s0.5-0.3 0.8-0.3h2.9c0.3 0 0.6 0.1 0.9 0.3s0.4 0.5 0.4 0.8c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-2.9c-0.3 0-0.6-0.1-0.8-0.4S26.1 16.5 26.1 16.1z"/></svg>';

    var iconHtml = $(sunsetIcon).html();

    return iconHtml;
  }

  function renderSunset() {
    var sunriseIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sunrise" viewBox="0 0 32.4 28.8"><path fill="#ffffff" d="M0.9 17c0-0.3 0.1-0.6 0.4-0.9 0.3-0.2 0.6-0.4 0.9-0.4H5c0.3 0 0.6 0.1 0.8 0.4s0.3 0.5 0.3 0.9c0 0.4-0.1 0.7-0.3 0.9S5.4 18.3 5 18.3H2.1c-0.3 0-0.6-0.1-0.9-0.4S0.9 17.3 0.9 17zM5 7c0-0.3 0.1-0.6 0.3-0.9 0.3-0.2 0.6-0.4 0.9-0.4 0.3 0 0.6 0.1 0.9 0.4l2.1 2.1c0.2 0.3 0.4 0.6 0.4 0.9 0 0.4-0.1 0.6-0.3 0.9s-0.5 0.4-0.8 0.4c-0.3 0-0.6-0.1-0.9-0.4l-2.1-2C5.1 7.7 5 7.4 5 7zM7.5 23.9c0-0.4 0.1-0.6 0.4-0.9 0.2-0.2 0.5-0.3 0.9-0.3H12l3.9-3.7c0.1-0.1 0.3-0.1 0.4 0l3.9 3.7h3.5c0.3 0 0.6 0.1 0.9 0.3s0.4 0.5 0.4 0.8c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-4.2c-0.1 0-0.2 0-0.4-0.1l-3-2.8 -3 2.8c-0.1 0.1-0.2 0.1-0.4 0.1H8.8c-0.3 0-0.6-0.1-0.9-0.4S7.5 24.2 7.5 23.9zM8.7 17c0 1.2 0.3 2.3 0.8 3.3 0 0.1 0.1 0.2 0.3 0.2h2.4c0.1 0 0.2 0 0.2-0.1s0-0.1 0-0.2c-0.8-1-1.2-2-1.2-3.2 0-1.4 0.5-2.6 1.5-3.6s2.2-1.5 3.6-1.5c1.4 0 2.6 0.5 3.6 1.5s1.5 2.2 1.5 3.6c0 1.2-0.4 2.2-1.2 3.2 -0.1 0.1-0.1 0.2 0 0.2s0.1 0.1 0.2 0.1h2.4c0.2 0 0.3-0.1 0.3-0.2 0.5-1 0.8-2.1 0.8-3.3 0-1-0.2-2-0.6-2.9s-0.9-1.7-1.6-2.4 -1.5-1.2-2.4-1.6 -1.9-0.6-2.9-0.6c-1 0-2 0.2-2.9 0.6s-1.7 0.9-2.4 1.6 -1.2 1.5-1.6 2.4S8.7 16 8.7 17zM15 5.8V2.9c0-0.4 0.1-0.7 0.4-0.9s0.5-0.3 0.9-0.3c0.4 0 0.6 0.1 0.9 0.4s0.3 0.5 0.3 0.9v2.9c0 0.4-0.1 0.7-0.3 0.9S16.6 7 16.2 7c-0.4 0-0.7-0.1-0.9-0.3S15 6.2 15 5.8zM22.9 9.1c0-0.3 0.1-0.6 0.3-0.9l2-2.1c0.2-0.2 0.5-0.4 0.9-0.4s0.6 0.1 0.9 0.4 0.4 0.5 0.4 0.9c0 0.4-0.1 0.7-0.3 0.9l-2.1 2c-0.3 0.2-0.6 0.4-0.9 0.4 -0.3 0-0.6-0.1-0.8-0.3S22.9 9.5 22.9 9.1zM26.2 17c0-0.3 0.1-0.6 0.3-0.9s0.5-0.4 0.8-0.4h2.9c0.3 0 0.6 0.1 0.9 0.4s0.4 0.5 0.4 0.9c0 0.3-0.1 0.6-0.4 0.9s-0.5 0.4-0.9 0.4h-2.9c-0.3 0-0.6-0.1-0.8-0.4S26.2 17.4 26.2 17z"/></svg>';

    var iconHtml = $(sunriseIcon).html();

    return iconHtml;
  }

  return {
    sunrise: renderSunrise,
    sunset: renderSunset
  };
})(jQuery);
