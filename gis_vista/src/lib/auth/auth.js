import { WEB_API_URL } from "../../config";
const defReqOptions = { method: 'POST', credentials: 'include' };

function Auth() { }

Auth.prototype.login = function (user, password) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${user}&password=${password}`;
    const request = new Request(`${WEB_API_URL}/login`, {
        ...defReqOptions,
        headers,
        body
    });
    return fetch(request)
        .then(response => {
            if (response.status === 401) throw new Error('Usuario o clave incorrecta');
            localStorage.clear();
            localStorage.setItem('dniUser',user);
            return response.json();
        });
};
Auth.prototype.logout = function () {
    const request = new Request(`${WEB_API_URL}/logout`, defReqOptions);
    return fetch(request)
        .then(response => {
            if (response.status === 500) throw new Error(response.statusText);
            localStorage.clear();
            return true;
        })
};
Auth.prototype.isAuthenticated = function () {
    const request = new Request(`${WEB_API_URL}/isAuthenticated`, defReqOptions);
    return fetch(request)
        .then(response => {
            if (response.status === 401) return false;
            return true;
        });
        
};


export default new Auth();