// var Token = {
//     // based off of : http://kaaes.github.io/albums-availability/#18qY7zpuNqeXNGywRysjxx
//     setAccessToken: function(accessToken) {
//         localStorage.setItem('access-token', accessToken);
//     },
//     getAccessToken: function() {
//         return localStorage.getItem('access-token');
//     },
//     getValidAccessToken: function() {
//         var expiresAt = parseInt(localStorage.getItem('token-expires-at'), 10);
//         var token = localStorage.getItem('access-token');
//         var now = Date.now();
//         return !!token && !!expiresAt && expiresAt > now ? token : null;
//     },
//     setAccessTokenExpiry: function(expiresIn) {
//         var now = Date.now();
//         // add the number of ms to seconds, then x 1000 to create an hour from now.
//         var expiresAt = now + parseInt(expiresIn, 10) * 1000;
//         localStorage.setItem('token-expires-at', expiresAt);
//     },
//     getAccessTokenExpiry: function() {
//         return localStorage.getItem('token-expires-at');
//     },
//     setRefreshToken: function(refreshToken) {
//         localStorage.setItem('refresh-token', refreshToken);
//     },
//     getRefreshToken: function() {
//         return localStorage.getItem('refresh-token');
//     }
// };