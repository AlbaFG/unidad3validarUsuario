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
/**
*Función para comprobar el parámetro en la uri
*@author Alba Fernandez
*@param {string} parametro -caracteres introducidos
*@return {array} Devuelve el parametro
*/
function compruebaParametro(parametro) {
    "use strict";
    if (parametro === "") {
        parametro = null;
    } else {
        parametro = parametro;
    }
    return parametro;
}
/**
*Función rellena ceros en caso de no estar el dni completo
*@param {string} dni -caracteres introducidos
*@return {array} Devuelve el dni con los ceros añadidos
*/
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
/**
*Función para comprobar el parámetro en la uri
*@param {string} dni -caracteres introducidos
*@return {array} Devuelve el dni siendo transformado si era caracter especial
*/
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
/**
*Función para comprobar el dni este correctamente
*@param {string} dni -caracteres introducidos
*@return {boolean} Comrueba que este correctamente
*/
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
/**
*Función para comprobar que este correcto el genero
*@param {string} gender -caracteres introducidos
*@return {array} Devuelve el genero obtenido
*/
function genderCorrecto(gender) {
    "use strict";
    var genders = /M|F/;
    return genders.test(gender);
}
/**
*Función para comprobar que este correcta la contrasenia
*@param {string} contrasenia -caracteres introducidos
*@return {array} Devuelve la contrasenia obtenida
*/
function esContrasenaCorrecta(contrasena) {
    "use strict";
    var contrasenaExp = new RegExp("^[A-ZÁÉÍÓÚÑÜ]{6,10}$");
    return contrasenaExp.test(contrasena);
}
/**
*Función para comprobar que sea anio bisiesto
*@param {string} anio -caracteres introducidos
*@return {boolean} Devuelve si el anio es bisiesto o no
*/
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
/**
*Función para validar la fecha
*@param {string} dia -caracteres introducidos
*@param {string} mes -caracteres introducidos
*@param {string} anio -caracteres introducidos
*@return {array} Devuelve la fecha obtenida
*/
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
/**
*Función comprueba que la fecha sea correcta
*@param {string} fecha -fecha introducida
*@return {boolean} Devuelve si es correcto o no
*/
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
/**
*Función comprueba que la fecha sea correcta
*@param {string} name -nombre introducido
*@return {boolean} Devuelve si es correcto o no
*/
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
/**
*Función comprueba que helpdni sea correcto
*@param {string} helpdni -nombre introducido
*@return {boolean} Devuelve si es correcto o no
*/
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
/**
*Función para comprobar que todos los parametros son correctos
*@param {string} nombreParametro -nombre del parametro
*@param {string} parametro -cdatos que contiene el parametro
*@return {boolean} Devuelve si todos los parametros son correctos o no
*/
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
/**
*Función para comprobar que se encuentre helpdni en la uri
*@param {array} uri -uri completa
*@param {string} elemento -cada uno de los elementos
*@return {boolean} Devuelve si se encuentra o no
*/
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
/**
*Función para comprobar todos los argumentos son correctos
*@param {array} uri -uri completa
*@param {string} nif -dni introducido
*@param {string} pass -contrasenia introducida
*@param {string} name -nombre introducida
*@param {string} gender -genero introducido
*@param {string} date -fecha introducida
*@param {string} helpdni -helpdni
*@return {boolean} Devuelve si todos los argumentos son correctos o no
*/
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
/**
*Función para comprobar cual es el último incorrecto
*@param {array} uri -uri completa
*@param {string} nif -dni introducido
*@param {string} pass -contrasenia introducida
*@param {string} name -nombre introducida
*@param {string} gender -genero introducido
*@param {string} date -fecha introducida
*@param {string} helpdni -helpdni
*@return {boolean} Devuelve si todos los argumentos son correctos o no
*/
function ultimoInvalido(uri, nif, pass, name, gender, date, helpdni) {
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
/**
*Función para abrir la ventana nueva en el navegador
*/
function abrirEnPestana() {
    "use strict";
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = "http://www.interior.gob.es/web/servicios-al-ciudadano/dni";
    a.click();
}
/**
*Función para comprobar si debe abrir la ventana de helpdni
*@param {string} parametro -parametro de helpdni introducido
*/
function seMuestraVentana(parametro) {
    "use strict";
    if (!parametro) {
        parametro = parametro;
    } else {
        if (parametro.toLowerCase() === "y" || parametro.toLowerCase() === "yes") {
            abrirEnPestana();
        } else {
            parametro = parametro;
        }
    }
}
/**
*Función para recorrer la uri
*@param {array} uri -uri completa
*@param {string} elemento -dni introducido
*@return {string} devuelve el parametro
*/
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
/**
*Función para comprobar que están vacíos
*@param {string} dni -dni introducido
*@param {string} pass -contrasenia introducida
*@param {string} name -nombre introducida
*@param {string} gender -genero introducido
*@param {string} date -fecha introducida
*@return {boolean} Devuelve si algún argumento está vacío
*/
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
/**
*Función para calcular la edad
*@param {string} fecha -fecha introducida
*@return {integer} Devuelve la edad calculada
*/
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
/**
*Función para comprobar si el dni coincide con usuario
*@param {string} dni -dni introducida
*@param {string} usuario -usuario
*@return {boolean} Devuelve si es correcto o no
*/
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
/**
*Función para comprobar si la contrasenia  coincide con usuario
*@param {string} pass -dni introducida
*@param {string} usuario -usuario
*@return {boolean} Devuelve si es correcto o no
*/
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
/**
*Función para comprobar la hora
*@return {string} Devuelve el saludo según la hora actual
*/
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
/**
*Función para saludar según el género
*@param {string} gender -dni introducida
*@return {string} Devuelve el usuario correspondiente
*/
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
/**
*Función para comprobar los parametros del usuario
*@param {string} dato -dni introducida
*@param {string} usuario -usuario
*@return {string} Devuelve los datos del usuario
*/
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
/**
*Función para comprobar si el nombre, fecha y genero seencuentran vacios
*@param {string} nombre -dni introducida
*@param {string} fecha -dni introducida
*@param {string} gender -dni introducida
*@return {boolean} Devuelve si alguno se encuentra vacío o no
*/
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
/**
*Función que contiene los usuarios de la base de datos
*@param {array} usuario -dni introducida
*@param {string} parametro -dni introducida
*@return {string} Devuelve el usuario
*/
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
/**
*Función que controla todas las demás funciones segun los datos introducidos
*@param {array} uri -dni introducida
*@return {string} Devuelve el resultado según las opciones de la uri
*/
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
            parametroInvalido = ultimoInvalido(uri, NIF, PASSWORD, NAME, GENDER, DATE, HELPDNI);
            resultado = ARGUMENTO + parametroInvalido + NO_ADMITIDO;
        }
    } catch (error) {
        resultado = error.message;
    }
    return resultado;
}
