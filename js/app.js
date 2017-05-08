/*jslint browser:true*/
/*global nav, so, validateUserData*/
/*jslint es6 */
/**
*Función detecta el navegador del usuario
*@param {array} usuarioNav
*@return {string} Devuelve el resultado obtenido
*/
function usuarioNav() {
    "use strict";
    var OTRO = "Otro";
    var navegador = navigator.userAgent;
    var resultado;
    var usuarioNav = /Firefox|OPR|Chrome|Edge/g;
    if (navegador.match(usuarioNav)) {
        if (navegador.match(usuarioNav)[1]) {
            if (navegador.match(usuarioNav)[1] === "OPR") {
                resultado = "Opera";
            } else {
                resultado = navegador.match(usuarioNav)[1];
            }
        } else {
            resultado = navegador.match(usuarioNav)[0];
        }
    } else {
        resultado = OTRO;
    }
    return resultado;
}
/**
*Función que detecta el sistema operativo del usuario
*@return {string} Devuelve el resultado obtenido
*/
function usuarioSO() {
    "use strict";
    var so = navigator.userAgent;
    var buscadorSo = new RegExp(["Linux|Windows"]);
    return buscadorSo.exec(so)
        ? buscadorSo.exec(so).toString()
        : "Otro";
}
var so = usuarioSO();
var nav = usuarioNav();
var uri = location.search;
document.write(validateUserData(uri));
