// $(function() {
//   'use strict';
//
//   var BASE_URL = 'https://sunsetwx.com/'
//   var REG_KEY = '0OdKkau61SPKMU0GcLfPz9cI';
//   var ENPOINT = '/v1/register';
//   var PASSWORD = "B13b18a2"
//
//   console.log("hello world!")
//
// }
// });

$(function() {
  'use strict';

  $(function () {
    // App.State.get();
    App.Render.renderForm();
  });
});

//
// (function () {
//   var BASE_URL = 'https://sunburst.sunsetwx.com/v1'
//
//   // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQWNjZXNzIiwiVVVJRCI6IjkyOGFlZTgzLWY3ODAtNDc4Zi1iYzY2LTA3OTRlMmYyNjk2MCIsIlByaXZpbGVnZXMiOiJUZXN0ZXIiLCJDYWxscyI6MjUwLCJleHAiOjE1MDAyOTU2NjN9.reuQzP8X5YTdraz9gGWfti4Dp-b5eLDp2JpJtgvPYBfjBXqMH22xbVsg8iSRFpoDA2_QMTTvex_fFnPb3z9M804NuGMaXqcrT7DlF9_0SYuRZiCi32uzcF7uTPtMsgSk_MHWgzs1WjgYoNNdW2-ykTSZVEZzZiZsQgjbOuyL8uQ0g37vb3fTvEnf-bK6dTx9AVoJ6reGmfxTyD7LanhosTkyL8dXjmc4hwQq3l8LiKQoswfkJvJ95--Vp7RiKf6U9afpJWn_Ssf7Jr-jZJVYw2xl_pr6u-v0NEW-ET44v0RhgT3MhNVMxjhvIcv_wzA6MUjMiv5GiQ20wwmIEnzo3qLGHCWzkrY7bYYHw8bPKiZAbqdqQpHYeUmRr4BUTFEejLiiPwOZS_CIxUGUyNrqjQEvGYEGFQbgFmclm1ac6FCvJvxlT7iRRQebDjIo8zwpFxl6PNm1K2PVVQxhaR8uR0Y0Q0HHPUrM2sGR4zrndtiRHzmOYlXtrh5g-K90mLAPfuIW2OL72OjQpLhljhuWX17ANLVCqYBmnVfJWSjU_20NHwuhGBNzKyCLQay_3BeCqELG0YjDmZQGdsj6P_eHzkN1L1rNc5Q_nZ3zXpXUSfDOEiNX15mwmkxcj4Bm7mowNMbQ3BwEjIfEOCuYBV7_7NvlCCx3IXfQAaCOAYZJoQI
//   // token_exp_sec: 604800
//
//   function authenticate () {
//     return $.ajax(BASE_URL + '/login', {
//       type: 'POST',
//       data: {
//         type: 'access',
//         email: 'michaelablackham@gmail.com',
//         password: 'B13b18a2'
//       },
//       async: true,
//       complete: function (jqXHR, textStatus) {
//         if (jqXHR.status <= 200 && jqXHR.status < 300) {
//
//         }
//         console.log()
//         console.log(arguments)
//       }
//     })
//   }
//
//   // authenticate()
//
//   function predictions () {
//     // 39.728882,-105.064381
//     return $.ajax(BASE_URL + '/quality', {
//       data: {
//         coords: '39.728882,-105.064381',
//         type: 'sunset'
//       },
//       headers: {
//         Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQWNjZXNzIiwiVVVJRCI6IjkyOGFlZTgzLWY3ODAtNDc4Zi1iYzY2LTA3OTRlMmYyNjk2MCIsIlByaXZpbGVnZXMiOiJUZXN0ZXIiLCJDYWxscyI6MjUwLCJleHAiOjE1MDAyOTU2NjN9.reuQzP8X5YTdraz9gGWfti4Dp-b5eLDp2JpJtgvPYBfjBXqMH22xbVsg8iSRFpoDA2_QMTTvex_fFnPb3z9M804NuGMaXqcrT7DlF9_0SYuRZiCi32uzcF7uTPtMsgSk_MHWgzs1WjgYoNNdW2-ykTSZVEZzZiZsQgjbOuyL8uQ0g37vb3fTvEnf-bK6dTx9AVoJ6reGmfxTyD7LanhosTkyL8dXjmc4hwQq3l8LiKQoswfkJvJ95--Vp7RiKf6U9afpJWn_Ssf7Jr-jZJVYw2xl_pr6u-v0NEW-ET44v0RhgT3MhNVMxjhvIcv_wzA6MUjMiv5GiQ20wwmIEnzo3qLGHCWzkrY7bYYHw8bPKiZAbqdqQpHYeUmRr4BUTFEejLiiPwOZS_CIxUGUyNrqjQEvGYEGFQbgFmclm1ac6FCvJvxlT7iRRQebDjIo8zwpFxl6PNm1K2PVVQxhaR8uR0Y0Q0HHPUrM2sGR4zrndtiRHzmOYlXtrh5g-K90mLAPfuIW2OL72OjQpLhljhuWX17ANLVCqYBmnVfJWSjU_20NHwuhGBNzKyCLQay_3BeCqELG0YjDmZQGdsj6P_eHzkN1L1rNc5Q_nZ3zXpXUSfDOEiNX15mwmkxcj4Bm7mowNMbQ3BwEjIfEOCuYBV7_7NvlCCx3IXfQAaCOAYZJoQI'
//       },
//       complete: function (xhr, status) {
//         console.log(status, xhr)
//       }
//     })
//   }
//
//   predictions()
// })()
