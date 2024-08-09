/**
 * JS para la comprobación de los datos del formulario
 */

var nickI;
var levelRadioI;
var sizeS;
var error;
var avatarImg;
var avatarCont;
var avatarItem;

/**
 * Funcion para validar los datos del formulario
 * @param {*} event 
 */
function comprobarForm(event) {

    if(nickI.value.match(/(?<!\5)[0-9]/)) {
        nickI.focus();
        event.preventDefault();
        error.innerText="El campo nick no puede comenzar por un número";
        return false;

    } else if (sizeS.value=="0") {
        sizeS.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar un numero de cartas";
        return false;

    } 
    levelRadioI  = document.querySelector('input[name="level"]:checked')
    
    datosUsuario(nickI, levelRadioI, sizeS, avatarCont);
    historicoUser(nickI);
    return true
}

//Evento del drag and drop

/**
 * Evento par saber que imagen se mueve
 * @param {*} event 
 */
function moviendoImg(event) {
    avatarItem = event.target;
}

/**
 * Funcion que cambia las imagenes de posición
 * @param {*} event 
 */
function cambiarImg(event){
    avatarCont.src = avatarItem.src;
}

/**
 * Carga de objetos del Dom, comprabaciones y eventos del html
 */
function domCargado() {
    //captura de todos los elements
    nickI = document.getElementById('nick');
    sizeS = document.getElementById('cardOption');
    error = document.getElementById('error')
    form = document.getElementById('formulario')

    if(sessionStorage.getItem('error')) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeitem('error');
    }

    form.addEventListener('submit', comprobarForm);

    avatarImg = document.getElementsByClassName('avatarImgItem');
    //eventos del drag and drop
    for (let avatar of avatarImg) {
        avatar.addEventListener('dragstart', moviendoImg);
    }
    avatarCont = document.getElementById('avatarImg');
    avatarCont.addEventListener('dragover', e => (e.preventDefault()));
    avatarCont.addEventListener('drop', cambiarImg);
}

//Inicio de los eventos
document.addEventListener('DOMContentLoaded',domCargado);