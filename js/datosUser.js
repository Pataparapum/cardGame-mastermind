/**
 * JS para la gestión de los datos de usuario
 */

var nick;
var level;
var size;
var avatarImg;

/**
 * Seteando los datos del usuario en el session storage
 * @param {*} nick 
 * @param {*} level 
 * @param {*} size 
 * @param {*} avatarCont 
 */
function datosUsuario(nick, level, size, avatarCont) {

    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('level', level.value);
    sessionStorage.setItem('tamano', size.value);
    sessionStorage.setItem('avatarImg', avatarCont.src);
}

/**
 * Opteniendo los datos del session storage
 */
function getDatosUser() {
    nick = sessionStorage.getItem('nick');
    level = sessionStorage.getItem('level');
    size = sessionStorage.getItem('tamano');
    avatarImg = sessionStorage.getItem('avatarImg');    
}

/**
 * Comprobación de los datos en el session storage
 * @returns 
 */
function comprobaciónDatosUser() {
    if(nick == null) {
        sessionStorage.setItem('error',"No se ha rellenado correctamente el formulario")
        return false;
    }
    return true;
}

/**
 * Creación del histotico del juego
 * @param {*} nick 
 */
function historicoUser(nick) {
    let historicoStorage = localStorage.getItem('historico');
    let historico
    if (historicoStorage == null) {
        historico = []
    } else {
        historico = JSON.parse(historicoStorage);
    }
    let registroUsuario = {
        usuario: nick.value,
        fecha: Date.now()
    }
    historico.push(registroUsuario);
    localStorage.setItem('historico', Json.stringify(historico));
}