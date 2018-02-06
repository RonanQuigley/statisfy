window.onload = function(){
    if (window.location.href.indexOf('?') > -1) {
        (function parseQueryString() {
            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
            if (!Token.getValidAccessToken()) {
                var accessToken = getParameterByName('access_token');
                accessToken ? Token.setAccessToken(accessToken) : 
                console.error('access token is ' + accessToken + ', did you change the name of the query string param?');
            }
            if (!Token.getRefreshToken()) {
                var refreshToken = getParameterByName('refresh_token');
                refreshToken ? Token.setRefreshToken(refreshToken) : 
                console.error('refresh token is ' + refreshToken + ', did you change the name of the query string param?');
            }
            if (!Token.getAccessTokenExpiry()) {
                var expiry = getParameterByName('expiry_in');
                expiry ? Token.setAccessTokenExpiry(expiry) : 
                console.error('expiry time is ' + expiry + ', did you change the name of the query string param?');
            }
        }());
    }
}