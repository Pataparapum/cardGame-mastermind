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
        document.getElementById('tmpo').value = 280;
        if (level == "facil") document.getElementById('tmpo').value = 300;
        
    } else {
        document.getElementById('tmpo').value = 80;
        if (level == "facil") document.getElementById('tmpo').value == 100;
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

    setearCartas(tamanoPanel);
    mezclarCartas();

    if (size != "5") {
        for (let index = 0; index < (tamanoPanel*tamanoPanel); index++) {
            items+=`<div class="contenedorItem">
                        <div class=""> 
                            <img src="./img/reverso.jpg" id="${index}" class="card" width="60" draggable=false></img>
                        </div>
                        <div class="back"> 
                            <img src="${cardList[index]}" id="card_${index}" width="60" draggable=false></img>
                        </div>
                    </div>`;
        }
    } else {
        document.getElementById('juego').style.height='100px'
        for (let index = 0; index < (tamanoPanel*(tamanoPanel-1)); index++)  {
            items+=`<div class="contenedorItem">
                        <div class=""> 
                            <img src="./img/reverso.jpg" id="${index}" class="card" width="60" draggable=false></img>
                        </div>
                        <div class="back"> 
                            <img src="${cardList[index]}" id="card_${index}" width="60" draggable=false></img>
                        </div>
                    </div>`;
        }
    }
    
    //Seteo y mescla de las cartas
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
 * funcion que intercambia el src de la imagen seleccionada por su correspondiente
 * en cardList, esto en base al id
 * @param {*} event 
 */
function rotarCarta(event) {
    let item = event.target;
    let containerFront = item.parentElement;
    let containerBack = containerFront.nextElementSibling;

    //girar carta
    containerFront.classList.add("front")
    containerBack.classList.remove("back")
    
    item.removeEventListener('mousedown', rotarCarta);

    if (numClick == 0) {
        firstCard = item.src;
        firstId = item.id;
    } else if (numClick == 1) {
        secondId = item.id;
    }
    numClick++
}

/**
 * si no hay ninguna carta sin la clase "rotado" se ha ganado el juego
 * @returns 
 */
function revisarVictoria() {
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        if (!card.classList.contains('rotado')) {
            return false
        }
    }
    return true
}

/**
 * Funcion que muestra que termina el juego y muestra un mensaje de victoria
 */
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
 * Funcion que vuelve a setear las imagenes al reverso
 * @param {*} item1 
 * @param {*} item2 
 */
function rotarAlReverso(card1, card2) {
    let item1 = document.getElementById(card1);
    let item2 = document.getElementById(card2);
    
    item1.parentElement.classList.remove("front");
    item1.parentElement.nextElementSibling.classList.add("back")

    item2.parentElement.classList.remove("front");
    item2.parentElement.nextElementSibling.classList.add("back")
    
    eventosDelJuego()
}

function setOpacidad(opacidadA, opacidadD) {
    let intervalId = setInterval(() => {
        if (opacidadA < 1) {
            opacidadA +=0.1;
            addRemove.style.opacity = opacidadA;
        } else {
            let interval = setInterval (() => {
                if (opacidadD > 0) {
                    opacidadD -=0.1;
                    addRemove.style.opacity = opacidadD
                } else {
                    clearInterval(interval);
                }
                 
            }, 60)
            clearInterval(intervalId);
        }
    }, 100);
}

/**
 * Funcion que compruba si las cartas seleccionadas son del mismo tipo
 * sumar o restar el puntaje
 * @param {*} event 
 */
function comprobarCartas(event) {
    let puntuacion = document.getElementById("puntaje");
    let puntaje = parseInt(puntuacion.value);
    let restar;
    let addRemove = document.getElementById("addRemove")
    addRemove.classList.remove("disappear")

    if (numClick > 1) {
        let card = cardList[secondId];
        if ( Comprobar(card, firstCard, firstId, secondId) ) {

            puntuacion.value = puntaje + (tamanoPanel*tamanoPanel);
            if (level != "facil") puntuacion.value = puntaje + (tamanoPanel + tamanoPanel)
            //remover los eventos a los pares encontrados
            document.getElementById(secondId).removeEventListener('mouseup', comprobarCartas);
            document.getElementById(secondId).classList.add('rotado')

            document.getElementById(firstId).removeEventListener('mouseup', comprobarCartas);
            document.getElementById(firstId).classList.add('rotado')

            if(level == "dificil"){
                document.getElementById('tmpo').value = parseInt(document.getElementById('tmpo').value) + 20;
                addRemove.innerText = "+20"
                addRemove.classList.add("appearG")

                setOpacidad(0,1)                
            }
        
            if (revisarVictoria()) getVictoria();

        } else {
            eliminarEventos();
            setTimeout(rotarAlReverso, 900, secondId, firstId);

            switch (level) {
                case "facil": restar = 5                
                    break;

                case "medio": restar = tamanoPanel
                    break;
                
                case "dificil": restar = tamanoPanel + 5;
                    break
                default:
                    break;
            }

            if (puntaje - 10 < 0) {
                puntuacion.value = "0";
                puntaje = 0;
            } else if (puntaje > 0) puntuacion.value = puntaje - restar;

            if (level == "dificil") {
                document.getElementById('tmpo').value -=  10;
                addRemove.innerText = "-10"
                addRemove.classList.add("appearR")

                setOpacidad(0,1)                
            }
            
        }
        firstCard="";
        firstId="";
        numClick=0;
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
        document.getElementById('victoria').style.color = "red"
        document.getElementById('victoria').innerText = "Has perdido"
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
