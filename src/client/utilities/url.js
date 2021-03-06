export function getLocationHref() {
    /* this function looks trivial,
    but I need to wrap the property in
    a function for unit testing */
    return window.location.href;
}

export function getQueryStringElement(string) {
    const stringToFind = string.replace(/[\[\]]/g, '\\$&');
    const urlToSearch = getLocationHref();
    const regex = new RegExp('[?&]' + stringToFind + '(=([^&#]*)|&|#|$)');
    const array = regex.exec(urlToSearch);
    return decodeURIComponent(array[2].replace(/\+/g, ' '));
}

export function redirect(page, qsData) {
    const queryString = '?accessToken=' + qsData;
    window.location.assign(page + queryString);
}
