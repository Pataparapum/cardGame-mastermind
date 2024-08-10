/**
 * JS Para el juego de memoria
 */

//Declaración de vatiables globales
var tamanoPanel;
var cardList=[];
var firstCard;
var firstId;
var numClick=0;
var characterList=["./img/cardBruce.jpg", "./img/cardBarbara.jpg","./img/cardDamian.jpg", 
                "./img/cardDick.jpg", "./img/cardHelena.jpg","./img/cardIvy.jpg",
                "./img/cardJason.jpg","./img/cardJoker.jpg","./img/cardKate.jpg",
                "./img/cardOracle.jpg", "./img/cardRast.jpg", "./img/cardTalia.jpg"];

/**
 * Funcion que rellena el formulario con el nick y el avatar
 */
function rellenarFormularioUser() {
    document.getElementById('nick').value = nick;
    document.getElementById('avatarImg').src = avatarImg;
    tamanoPanel=parseInt(size)
}

/**
 * Funcion que rellena cardList con pares de un mismo tipo de carta,
 * dependiendo del tamaño del panel
 * @param {*} tamano 
 * @param {*} cardList 
 */
function setearCartas(tamano) {
    cardList=[]
    if (tamano == 6 ) {
        for (let card of characterList) {
            cardList.push(card);
            cardList.push(card);
        }
        for (let index = 0; index < 6; index++) {
            cardList.push(characterList[index]);
            cardList.push(characterList[index]);
        }

    } else {
        for (let index = 0; index < tamano + tamano; index++) {
            cardList.push(characterList[index]);
            cardList.push(characterList[index]);
        }
    } 
}

/**
 * Funcion para mesclar las cartas
 */
function mezclarCartas() {
    cardList = cardList.sort(function () {return Math.random() - 0.5});
}

/**
 * Funcion para pintar el panel del juego y crear la lista de cartas
 */
function generarPanel() {
    document.getElementById('juego').style.gridTemplateColumns=`repeat(${size}, 1fr)`
    document.getElementById('juego').style.gridTemplateRows=`repeat(${size}, 1fr)`

    let items = "";
    if (size != "5") {
        for (let index = 0; index < (tamanoPanel*tamanoPanel); index++) {
            items+=`<div class="contenedorItem"> <img src="./img/reverso.jpg" id="${index}" class="card" width="60"></img></div>`;
        }
    } else {
        document.getElementById('juego').style.height='100px'
        for (let index = 0; index < (tamanoPanel*(tamanoPanel-1)); index++)  {
            items+=`<div class="contenedorItem contenedorCinco"> <img src="./img/reverso.jpg" id="${index}" class="card" width="60"></img></div>`;
        }
    }
    
    setearCartas(tamanoPanel);
    mezclarCartas();
    document.getElementById('juego').innerHTML = items;
}

function eliminarEventos() {
    const cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.removeEventListener('mousedown', rotarCarta)
        card.removeEventListener('mouseup', comprobarCartas)
    }
}

/**
 * Funcion que vuelve a setear las imagenes al reverso
 * @param {*} item1 
 * @param {*} item2 
 */
function rotarAlReverso(item1, item2) {
    document.getElementById(item1).src = "./img/reverso.jpg";
    document.getElementById(item2).src = "./img/reverso.jpg";
    eventosDelJuego()
}

/**
 * funcion que intercambia el src de la imagen seleccionada por su correspondiente
 * en cardList, esto en base al id
 * @param {*} event 
 */
function rotarCarta(event) {
    let item = event.target;
    let itemId = item.id;
    let newCard = cardList[itemId];

    item.src = newCard;
    if (numClick == 0) {
        firstCard = newCard;
        firstId = itemId;
    }
    numClick++
}

function comprobarCartas(event) {
    let puntuacion = document.getElementById("puntaje");
    let puntaje = puntuacion.value
    if (numClick > 1) {
        let item = event.target;
        let card = cardList[item.id];
        if (card == firstCard) {
            puntuacion.value = parseInt(puntuacion.value) + 10

            firstCard="";
            firstId="";
            numClick=0;

        } else {
            eliminarEventos()
            setTimeout(rotarAlReverso, 500, item.id, firstId)

            if (puntaje > 0) puntuacion.value = puntaje - 10 
            firstCard="";
            firstId="";
            numClick=0;
        }
    }
}

/**
 * Funcion que añade los eventos requeridos para el funcionamiento del juego
 */
function eventosDelJuego() {
    const cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.addEventListener('mousedown', rotarCarta)
        card.addEventListener('mouseup', comprobarCartas)
    }
}

getDatosUser();

rellenarFormularioUser();
generarPanel();
eventosDelJuego();
