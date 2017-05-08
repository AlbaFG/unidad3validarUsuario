chai.should();
var navSys = navigator.userAgent.toLowerCase();

describe("Tests the Validacion de usuarios function", function() {
    it("Valores insuficientes e incorrectos", function() {
       validateUserData("?name=yolanda tejero").should.be.equal(CREDENCIALES_INVALIDAS);
    });
    it("Nif incorrecto", function () {
       validateUserData("?name=Sara%20Marquez&date=17oct95&password=CACAHUETE&gender=M&nif=X0009999F").should.be.equal(ERROR_ARGUMENTO + "nif" + INVALIDO);
    });
    it("Contraseña incorrecta", function () {
       validateUserData("?nif=K9999999J&password=NO").should.be.equal(ERROR_ARGUMENTO + "password" + INVALIDO);
    });
    it("Argumento incorrecto", function() {
       validateUserData("?nombre=Pepito").should.be.equal(ARGUMENTO + "nombre" + NO_ADMITIDO);
    });
    it("Navegador y sistema operativo", function () {
       validateUserData("?").should.be.equal(ESTAS_UTILIZANDO + nav + EN_SO + so);
    });
    it("Usuario sin registrar", function () {
       validateUserData("?name=juan%20valdez&date=30oct86&name=Juan%20Valdez&password=PLATANO&gender=M&nif=6565288F").should.be.equal(NO_PODER_LOCALIZAR_DATOS + "Sr. Valdez" + SU_EDAD_ES + "30 años");
    });
    it("Introducir mas de un nombre", function () {
       validateUserData("?name=Rodrigo%20Martin&date=17oct95&Juan%20Valdezname=name=name=&password=GOLONDRINA&gender=M&nif=6565288F").should.be.equal(NO_PODER_LOCALIZAR_DATOS + "Sr. Martin" + SU_EDAD_ES + "21 años");
    });
    it("Tipo fecha: dd/mmm/yy", function () {
       validateUserData("?name=Ernesto%20Sevilla&password=PISTACHO&date=16jul96&gender=M&nif=53844456F").should.be.equal(NO_PODER_LOCALIZAR_DATOS + "Sr. Sevilla" + SU_EDAD_ES + "20 años");
   });
    it("Fecha ddmmyyyy", function () {
       validateUserData("?name=Ernesto%20Sevilla&password=ALMENDRA&date=05111990&gender=M&nif=53844456F").should.be.equal(NO_PODER_LOCALIZAR_DATOS+ "Sr. Sevilla" + SU_EDAD_ES + "26 años");
    });
    it("Fecha mmddyy ", function () {
       validateUserData("?name=Ernesto%20Sevilla&password=PISTACHO&date=061886&gender=M&nif=53844456F").should.be.equal(NO_PODER_LOCALIZAR_DATOS + "Sr. Sevilla" + SU_EDAD_ES + "30 años");
    });
    it("Introducir helpdni", function () {
       validateUserData("?name=Sara%20Gonzalez&password=AVESTRUZ&date=05111980&gender=F&nif=6565288F&helpdni=YES").should.be.equal(NO_PODER_LOCALIZAR_DATOS + "Sra. Gonzalez" + SU_EDAD_ES + "36 años");
    });
//    it("Introducimos usuario en la base de datos (por la mañana)", function () {
//       validateUserData("?name=Luisa%20Sánchez&password=PERIQUITOS&date=16aug48&gender=F&nif=X1234567L").should.be.equal("Buenos días Sra. Sánchez. Su edad es 68 años");
//    });
});
