(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function usuarioNav() {
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
function usuarioSO() {
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

},{}],2:[function(require,module,exports){
/*jslint browser:true*/
/*global nav, so*/
/*jslint es6 */
var SU_EDAD_ES = ". Su edad es ";
var ANIOS = " años";
var NO_PODER_LOCALIZAR_DATOS = "No hemos podido localizar sus datos ";
var CREDENCIALES_INVALIDAS = "Error: Credenciales inválidas";
var ESTAS_UTILIZANDO = "Está utilizando el navegador ";
var EN_SO = " en un sistema operativo ";
var ERROR_ARGUMENTO = "Error: Argumento ";
var ARGUMENTO = "Argumento ";
var NO_ADMITIDO = " no admitido";
var INVALIDO = " inválido";
var NIF = "nif";
var NAME = "name";
var PASSWORD = "password";
var GENDER = "gender";
var DATE = "date";
var CLAVE_CIFRADO = "javascript";
var HELPDNI = "helpdni";
/**@Funciones de Vigenere*/
function cambiaLetraAnumero(char) {
    "use strict";
    var letras = "abcdefghijklmnopqrstuvwxyz";
    return letras.indexOf(char);
}
function cambiaNumeroALetra(num) {
    "use strict";
    var letras = "abcdefghijklmnopqrstuvwxyz";
    return letras.substr(num, 1);
}
function trd(caracter, cadenaEspecial, cadenaBuena) {
    "use strict";
    return cadenaBuena[cadenaEspecial.search(caracter)];
}
function controlLetrasEspeciales(string) {
    "use strict";
    var letrasEspeciales = "áéíóúüñ";
    var letrasCorrectas = "aeiouun";
    var resultadoString = "";
    var index = 0;
    while (string[index]) {
        if (letrasEspeciales.search(string[index]) !== -1) {
            resultadoString = resultadoString +
                    trd(string[index], letrasEspeciales, letrasCorrectas);
        } else {
            resultadoString = resultadoString + string[index];
        }
        index += 1;
    }
    return resultadoString;
}
function getLetraCifrada(string, clave, index) {
    "use strict";
    var valorResultado = 0;
    var devuelveLetra = "";
    valorResultado = cambiaLetraAnumero(string[index]) +
            cambiaLetraAnumero(clave[index]);
    if (valorResultado > 25) {
        devuelveLetra = cambiaNumeroALetra(valorResultado - 26);
    } else {
        devuelveLetra = cambiaNumeroALetra(valorResultado);
    }
    return devuelveLetra;
}
function cifrar(string, clave) {
    "use strict";
    var palabraCifrada = "";
    var index = 0;
    while (string[index]) {
        palabraCifrada = palabraCifrada + getLetraCifrada(string, clave, index);
        index += 1;
    }
    return palabraCifrada;
}
function vigenere(string, clave) {
    "use strict";
    string = controlLetrasEspeciales(string);
    return cifrar(string, clave);
}
/**@Funciones ValidateUserData*/
function compruebaParametro(parametro) {
    "use strict";
    if (parametro === "") {
        parametro = null;
    } else {
        parametro = parametro;
    }
    return parametro;
}
function poneCeroDni(dni) {
    "use strict";
    var regLetra = new RegExp("^[KLMXYZ]");
    var maximoLetras = 9;
    var ceros = dni.length;
    var nuevoDni = "";
    var subNum;
    if (regLetra.test(dni[0])) {
        subNum = 1;
        nuevoDni = dni[0];
    } else {
        subNum = 0;
    }
    while (ceros < maximoLetras) {
        nuevoDni = nuevoDni + "0";
        ceros += 1;
    }
    dni = nuevoDni + dni.substr(subNum, dni.length);
    return dni;
}
function esCorrectaLetraDni(dni) {
    "use strict";
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letrasNie = "XYZ";
    var primeraLetraNie = /X|Y|Z|K|L|M/;
    var letrasEspeciales = /K|L|M/;
    var esCorrecto;
    var letraDni;
    var numeroLetra;
    dni = poneCeroDni(dni);
    letraDni = dni.substr(8);
    if (primeraLetraNie.test(dni.charAt(0))) {
        if (letrasEspeciales.test(dni.charAt(0))) {
            numeroLetra = dni.substr(1, 7) % 23;
        } else {
            numeroLetra = (letrasNie.indexOf(dni[0]) + dni.substr(1, 7)) % 23;
        }
    } else {
        numeroLetra = dni.substr(0, 8) % 23;
    }
    if (letras[numeroLetra] === letraDni) {
        esCorrecto = true;
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}
function esCorrectoDNI(dni) {
    "use strict";
    var reg = new RegExp(/^[KLMXYZ]?\d{1,8}[A-Z]$/);
    var esCorrecto;
    if (reg.test(dni)) {
        esCorrecto = esCorrectaLetraDni(dni);
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}
function genderCorrecto(gender) {
    "use strict";
    var genders = /M|F/;
    return genders.test(gender);
}
function esContrasenaCorrecta(contrasena) {
    "use strict";
    var contrasenaExp = new RegExp("^[A-ZÁÉÍÓÚÑÜ]{6,10}$");
    return contrasenaExp.test(contrasena);
}


function esAnioBisiesto(anio) {
    "use strict";
    anio = Math.abs(anio);
    var esCorrecto;
    if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0) {
        esCorrecto = true;
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}

function validateDays(dia, mes, anio) {
    "use strict";
    var maxDays;
    var result;
    if (mes < 1 || mes > 12) {
        result = false;
    } else {
        switch (mes) {
        case 2:
            if (esAnioBisiesto(anio)) {
                maxDays = 29;
            } else {
                maxDays = 28;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            maxDays = 30;
            break;
        default:
            maxDays = 31;
        }
        if (dia < 1 || dia > maxDays) {
            result = false;
        } else {
            result = true;
        }
    }
    return result;
}
function fechaCorrecta(fecha) {
    "use strict";
    const MONTH = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec";
    var anio = fecha.substr(5, 2);
    var dia = fecha.substr(0, 2);
    var result;
    var mes;
    if (fecha.length === 6 || fecha.length === 7 || fecha.length === 8 || fecha.length === 9) {
        if (Number.isNaN(fecha)) {
            mes = (MONTH.search(fecha.substr(2, 3)) / 4) + 1;
        } else {
            anio = fecha.substr(2, 2);
        }
        result = validateDays(dia, mes, anio);
    } else {
        result = false;
    }
    return result;
}
function nombreCorrecto(name) {
    "use strict";
    var esCorrecto;
    name = name.trim();
    if (name.length > 25) {
        esCorrecto = false;
    } else {
        if (name.split(" ").length > 2 || name.split(" ").length === 1) {
            esCorrecto = false;
        } else {
            esCorrecto = true;
        }
    }
    return esCorrecto;
}
function esHelpDniCorrecto(helpdni) {
    "use strict";
    var esCorrecto;
    helpdni = helpdni.toUpperCase();
    if (helpdni === "YES" || helpdni === "Y") {
        esCorrecto = true;
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}
function esParametroIncorrecto(nombreParametro, parametro) {
    "use strict";
    var esIncorrecto = false;
    switch (nombreParametro) {
    case NIF:
        esIncorrecto = esCorrectoDNI(parametro);
        break;
    case PASSWORD:
        esIncorrecto = esContrasenaCorrecta(parametro);
        break;
    case NAME:
        esIncorrecto = nombreCorrecto(parametro);
        break;
    case GENDER:
        esIncorrecto = genderCorrecto(parametro);
        break;
    case DATE:
        esIncorrecto = fechaCorrecta(parametro);
        break;
    case HELPDNI:
        esIncorrecto = true;
        break;
    default:
        esIncorrecto = false;
    }
    return esIncorrecto;
}
function estaHelpDniEnUri(uri, elemento) {
    "use strict";
    var estaElemento = false;
    var parametro;
    var parametroSplit;
    var x;
    elemento = "&" + elemento;
    uri = uri.split(elemento);
    for (x = 1; x < uri.length; x += 1) {
        if (uri[x].search("&") !== -1) {
            parametroSplit = uri[x].split("&");
            parametro = parametroSplit[0];
        } else {
            parametro = uri[x];
        }
        if (parametro === "" || parametro === "=") {
            estaElemento = true;
        } else {
            estaElemento = false;
        }
    }
    return estaElemento;
}

function parametrosInvalidos(uri, nif, pass, name, gender, date, helpdni) {
    "use strict";
    var x;
    var uriHelpDni = decodeURIComponent(uri.replace(uri[0], "&"));
    var elementosUri = uriHelpDni.split("&");
    var hayElementoInvalido;
    for (x = 1; x < elementosUri.length && !hayElementoInvalido; x += 1) {
        if (elementosUri[x].indexOf(nif) === -1 &&
        elementosUri[x].indexOf(nif + "=") === -1 &&
        elementosUri[x].indexOf(pass) === -1 &&
        elementosUri[x].indexOf(pass + "=") === -1 &&
        elementosUri[x].indexOf(name) === -1 &&
        elementosUri[x].indexOf(name + "=") === -1 &&
        elementosUri[x].indexOf(gender) === -1 &&
        elementosUri[x].indexOf(gender + "=") === -1 &&
        elementosUri[x].indexOf(date) === -1 &&
        elementosUri[x].indexOf(date + "=") === -1 &&
        elementosUri[x].indexOf(helpdni) === -1 &&
        elementosUri[x].indexOf(helpdni + "=") === -1 &&
        elementosUri[x] !== "") {
            hayElementoInvalido = true;
        } else {
            hayElementoInvalido = false;
        }
    }
    return hayElementoInvalido;
}
function getUltimoParametroInvalido(uri, nif, pass, name, gender, date, helpdni) {
    "use strict";
    var x;
    var uriHelpDni = decodeURIComponent(uri.replace(uri[0], "&"));
    var elementosUri = uriHelpDni.split("&");
    var parametroSplit;
    var parametroInvalido;
    for (x = 1; x < elementosUri.length; x += 1) {
        if (parametrosInvalidos(uri, nif, pass, name, gender, date, helpdni)) {
            if (elementosUri[x] === "") {
                parametroInvalido = parametroInvalido;
            } else {
                parametroInvalido = elementosUri[x];
            }
        } else {
            parametroInvalido = parametroInvalido;
        }
    }
    if (parametroInvalido.indexOf("=") !== -1) {
        parametroSplit = parametroInvalido.split("=");
        parametroInvalido = parametroSplit[0];
    } else {
        parametroInvalido = parametroInvalido;
    }
    return parametroInvalido;
}
function abrirEnPestana() {
    "use strict";
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = "http://www.interior.gob.es/web/servicios-al-ciudadano/dni";
    a.click();
}
function seMuestraVentana(parametro) {
    "use strict";
    if (!parametro) {
        parametro = parametro;
    } else if (parametro.toLowerCase() === "y" || parametro.toLowerCase() === "yes") {
        abrirEnPestana();
    } else {
        parametro = parametro;
    }
}
function getValorFinal(uri, elemento) {
    "use strict";
    var uriHelp = uri;
    var nombreParametro = elemento;
    var helpdni = "helpdni";
    var error = new Error(ERROR_ARGUMENTO + nombreParametro + INVALIDO);
    var parametro;
    var parametroSplit;
    var x;
    var uriHelpDni = decodeURIComponent(uri.replace(uri[0], "&"));
    uri = decodeURIComponent(uri.replace(uri[0], "&"));
    elemento = "&" + elemento + "=";
    uri = uri.split(elemento);
    for (x = 1; x < uri.length; x += 1) {
        if (uri[x].search("&") !== -1) {
            parametroSplit = uri[x].split("&");
            parametro = parametroSplit[0];
        } else {
            parametro = uri[x];
        }
        if (!parametro && nombreParametro !== "helpdni") {
            parametro = compruebaParametro(parametro);
        } else {
            if (!esParametroIncorrecto(nombreParametro, parametro)) {
                helpdni = getValorFinal(uriHelp, helpdni);
                seMuestraVentana(helpdni);
                throw (error);
            }
        }
    }
    if (nombreParametro === "helpdni" && parametro === undefined) {
        if (estaHelpDniEnUri(uriHelpDni, nombreParametro)) {
            parametro = "yes";
        } else {
            parametro = null;
        }
    }
    return parametro;
}
function todosParametrosVacios(dni, name, pass, gender, date) {
    "use strict";
    var estanVacios;
    if (!dni && !name && !pass && !gender && !date) {
        estanVacios = true;
    } else {
        estanVacios = false;
    }
    return estanVacios;
}

function getEdad(fecha) {
    "use strict";
    const MONTH = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec";
    var fechaActual = new Date();
    var anio;
    var mes;
    if (fecha.length === 8) {
        anio = fecha.substr(6, 2);
        mes = fecha.substr(2, 2) - 1;
    } else {
        if (fecha.length === 6) {
            anio = fecha.substr(4, 2);
            mes = fecha.substr(2, 2) - 1;
        } else {
            anio = fecha.substr(5, 2);
            mes = (MONTH.search(fecha.substr(2, 3)) / 4);
        }
    }
    var day = fecha.substr(0, 2);
    var sum;
    if (anio > 30) {
        anio = Math.abs(anio) + 1900;
    } else {
        anio = Math.abs(anio) + 2000;
    }
    if (mes === fechaActual.getMonth() || mes > fechaActual.getMonth()) {
        if (mes === fechaActual.getMonth()) {
            if (day > fechaActual.getDate()) {
                sum = -1;
            } else {
                sum = 0;
            }
        } else {
            sum = -1;
        }
    } else {
        sum = 0;
    }
    return fechaActual.getFullYear() - anio + sum;
}
function dniCredenciales(dni, usuario) {
    "use strict";
    var esCorrecto;
    if (usuario.match(dni)) {
        esCorrecto = true;
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}
function contraseniaCredenciales(pass, usuario) {
    "use strict";
    var esCorrecto;
    if (usuario.match(pass)) {
        esCorrecto = true;
    } else {
        esCorrecto = false;
    }
    return esCorrecto;
}
function getSaludo() {
    "use strict";
    var horaSaludo = "";
    var MANIANA = "Buenos días ";
    var TARDE = "Buenas tardes ";
    var NOCHE = "Buenas noches ";
    var hora = new Date();
    if (hora.getHours() >= 20 || hora.getHours() < 0) {
        horaSaludo = NOCHE;
    } else {
        if (hora.getHours() < 14) {
            horaSaludo = MANIANA;
        } else {
            horaSaludo = TARDE;
        }
    }
    return horaSaludo;
}
function getSaludoGender(gender) {
    "use strict";
    var saludoGender = "";
    var SRA = "Sra. ";
    var SR = "Sr. ";
    if (gender === "M") {
        saludoGender = SR;
    } else {
        saludoGender = SRA;
    }
    return saludoGender;
}
function getParametroDeUsuario(dato, usuario) {
    "use strict";
    var posicionDelDato = usuario.indexOf(dato);
    var datoUsuario = "";
    while (usuario[posicionDelDato] !== "." && usuario[posicionDelDato]) {
        datoUsuario = datoUsuario + usuario[posicionDelDato];
        posicionDelDato += 1;
    }
    datoUsuario = datoUsuario.split(" ");
    if (datoUsuario.length >= 3) {
        datoUsuario = datoUsuario[2];
    } else {
        datoUsuario = datoUsuario[1];
    }
    return datoUsuario;
}
function parametrosIncorrectos(nombre, fecha, gender) {
    "use strict";
    var esNull;
    if (!nombre || !fecha || !gender) {
        esNull = true;
    } else {
        esNull = false;
    }
    return esNull;
}
function usuariosBd(parametro) {
    "use strict";
    var USUARIO1 = "Nombre: Pepe Pérez. NIF: 12345678Z. Contraseña: lalajkf." +
            "Fecha de nacimiento: 030690. Sexo: M|Nombre: Luisa Sánchez." +
            " NIF: X1234567L. Contraseña; yemiiwzbdl." +
            "Fecha de nacimiento: 160848. Sexo: F|Nombre: Alberto López. " +
            "NIF: K9999999J. Contraseña: kadlwu. Fecha de nacimiento: 230707." +
            "Sexo: M";
    var SEPARADOR = "|";
    var miUsuario = "";
    var x;
    var usuario = USUARIO1.split(SEPARADOR);
    var esMiUsuario = false;

    for (x = 0; x < usuario.length && !esMiUsuario; x += 1) {
        if (usuario[x].indexOf(parametro) !== -1) {
            miUsuario = usuario[x];
            esMiUsuario = true;
        } else {
            miUsuario = "";
        }
    }
    return miUsuario;
}
function validateUserData(uri) {
    "use strict";
    var SEXO = "Sexo";
    var NACIMIENTO = "nacimiento";
    var NOMBRE = "Nombre";
    var resultado;
    var usuarioGender;
    var usuarioAnios;
    var name;
    var date;
    var dni;
    var pass;
    var gender;
    var usuario;
    var helpdni;
    var parametroInvalido;
    try {
        if (!parametrosInvalidos(uri, NIF, PASSWORD, NAME, GENDER, DATE, HELPDNI)) {
            dni = getValorFinal(uri, NIF);
            pass = getValorFinal(uri, PASSWORD);
            name = getValorFinal(uri, NAME);
            gender = getValorFinal(uri, GENDER);
            date = getValorFinal(uri, DATE);
            helpdni = getValorFinal(uri, HELPDNI);
            if (todosParametrosVacios(dni, name, pass, gender, date) && ((uri === "" || uri === "?") || (getValorFinal(uri, HELPDNI) !== null && getValorFinal(uri, HELPDNI) !== undefined))) {
                helpdni = getValorFinal(uri, HELPDNI);
                seMuestraVentana(helpdni);
                resultado = ESTAS_UTILIZANDO + nav + EN_SO + so;
            } else {
                if (!pass || !dni) {
                    resultado = CREDENCIALES_INVALIDAS;
                    seMuestraVentana(helpdni);
                } else {
                    usuario = usuariosBd(dni);
                    pass = vigenere(pass.toLowerCase(), CLAVE_CIFRADO);
                    dni = poneCeroDni(dni);
                    if (dniCredenciales(dni, usuario)) {
                        if (contraseniaCredenciales(pass, usuario)) {
                            usuarioGender = getParametroDeUsuario(SEXO, usuario);
                            usuarioAnios = getParametroDeUsuario(NACIMIENTO, usuario);
                            resultado = getSaludo() + getSaludoGender(usuarioGender) + getParametroDeUsuario(NOMBRE, usuario) + SU_EDAD_ES + getEdad(usuarioAnios) + ANIOS;
                            seMuestraVentana(helpdni);
                        } else {
                            resultado = CREDENCIALES_INVALIDAS;
                            seMuestraVentana(helpdni);
                        }
                    } else {
                        if (parametrosIncorrectos(name, date, gender)) {
                            resultado = CREDENCIALES_INVALIDAS;
                            seMuestraVentana(helpdni);
                        } else {
                            resultado = NO_PODER_LOCALIZAR_DATOS + getSaludoGender(gender) + name.split(" ")[1] + SU_EDAD_ES + getEdad(date) + ANIOS;
                            seMuestraVentana(helpdni);
                        }
                    }
                }
            }
        } else {
            parametroInvalido = getUltimoParametroInvalido(uri, NIF, PASSWORD, NAME, GENDER, DATE, HELPDNI);
            resultado = ARGUMENTO + parametroInvalido + NO_ADMITIDO;
        }
    } catch (error) {
        resultado = error.message;
    }
    return resultado;
}

},{}]},{},[2,1]);
