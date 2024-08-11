/**
 * JS Para el juego de memoria
 */

/**
 * Declaración de variables globales
 */
//Sobre el panel
var tamanoPanel;
var idInterval;

//Sobre la comprobación de las cartas
var firstCard;
var firstId;
var secondId;
var numClick=0;

//Sobre el funcionamiento del juego
var cardList=[];
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
    if (tamanoPanel == 6) {
        document.getElementById('tmpo').value = 240;
    } else if (tamanoPanel == 5) {
        document.getElementById('tmpo').value = 40
    }
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
            items+=`<div class="contenedorItem"> <img src="./img/reverso.jpg" id="${index}" class="card" width="60" draggable=false></img></div>`;
        }
    } else {
        document.getElementById('juego').style.height='100px'
        for (let index = 0; index < (tamanoPanel*(tamanoPanel-1)); index++)  {
            items+=`<div class="contenedorItem contenedorCinco"> <img src="./img/reverso.jpg" id="${index}" class="card" width="60" draggable=false></img></div>`;
        }
    }
    
    //Seteo y mescla de las cartas
    setearCartas(tamanoPanel);
    mezclarCartas();
    document.getElementById('juego').innerHTML = items;
}

/**
 * Funcion que elimina los eventos creados en cada carta
 */
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

    item.removeEventListener('mousedown', rotarCarta);
    
    item.src = newCard;
    if (numClick == 0) {
        firstCard = newCard;
        firstId = itemId;
    } else if (numClick == 1) {
        secondId = itemId;
    }
    numClick++
}

function revisarVictoria() {
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        if (!card.classList.contains('rotado')) {
            return false
        }
    }
    return true
}

function getVictoria() {
    clearInterval(idInterval);
    document.getElementById("tmpo").value = 0
    //finalizar todos los eventos
    eliminarEventos()
    
    //Cambiar z-index paneles
    if (tamanoPanel == 6) document.getElementById('endgame').style.height = "601px"
    document.getElementById('endgame').classList.add('juegoAcabadoColor');
    document.getElementById('endgame').style.zIndex=2;
    document.getElementById('juego').style.zIndex=1;
    document.getElementById('victoria').hidden = false
    document.getElementById('nuevaPartida').addEventListener('click',(e)=>location.reload())
}

/**
 * Devuelve true si los IDs dan el mismo tipo de carta en cardList
 * o si card es igual a la primer carta seleccionada y el primer y segundo id sean distintos
 * @param {*} card 
 * @param {*} firstCard 
 * @param {*} firstId 
 * @param {*} secondId 
 * @returns 
 */
function Comprobar(card, firstCard, firstId, secondId) {
    if (cardList[firstId] == cardList[secondId]) return true
    if (card != firstCard || firstId == secondId ) return false
    return true;
}

/**
 * Funcion que compruba si las cartas seleccionadas son del mismo tipo
 * sumar o restar el puntaje
 * @param {*} event 
 */
function comprobarCartas(event) {
    let puntuacion = document.getElementById("puntaje");
    let puntaje = parseInt(puntuacion.value);
    if (numClick > 1) {
        let card = cardList[secondId];
        if ( Comprobar(card, firstCard, firstId, secondId) ) {
            puntuacion.value = puntaje + (tamanoPanel*tamanoPanel);

            //remover los eventos a los pares encontrados
            document.getElementById(secondId).removeEventListener('mouseup', comprobarCartas);
            document.getElementById(secondId).classList.add('rotado')

            document.getElementById(firstId).removeEventListener('mouseup', comprobarCartas);
            document.getElementById(firstId).classList.add('rotado')
            
            firstCard="";
            firstId="";
            numClick=0;

            if (revisarVictoria()) getVictoria();

        } else {
            eliminarEventos();
            setTimeout(rotarAlReverso, 500, secondId, firstId);

            if (puntaje - 10 < 0) {
                puntuacion.value = "0";
                puntaje = 0;
            } else if (puntaje > 0) puntuacion.value = puntaje - 10 ;
            firstCard="";
            firstId="";
            numClick=0;
        }
    }
}

/**
 * Funcion que realiza el conteo hacia atrás del juego
 */
function cuentaAtras() {
    let tiempoRestante = parseInt(document.getElementById('tmpo').value) - 1;
    document.getElementById('tmpo').value=tiempoRestante;
    if(tiempoRestante==0) {
        clearInterval(idInterval);
        //finalizar todos los eventos
        eliminarEventos()

        //Cambiar z-index paneles
        if (tamanoPanel == 6) document.getElementById('endgame').style.height = "601px"
        document.getElementById('endgame').classList.add('juegoAcabadoColor');
        document.getElementById('endgame').style.zIndex=2;
        document.getElementById('juego').style.zIndex=1;
        document.getElementById('nuevaPartida').addEventListener('click',(e)=>location.reload())
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
//Cuenta atras
idInterval = setInterval(cuentaAtras, 1000);
