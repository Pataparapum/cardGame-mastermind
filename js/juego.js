/**
 * JS Para el juego de memoria
 */

var tamanoPanel;

function rellenarFormularioUser() {
    document.getElementById('nick').value = nick;
    document.getElementById('avatarImg').src = avatarImg;
    tamanoPanel=parseInt(size)
}

function pintarPanel() {
    document.getElementById('juego').style.gridTemplateColumns=`repeat(${size}, 1fr)`
    document.getElementById('juego').style.gridTemplateRows=`repeat(${size}, 1fr)`

    let items="";

    for (let index = 0; index < (tamanoPanel*tamanoPanel); index++) {
        items+=`<div class="contenedorItem"> <img src="./img/reverso.jpg" id="${index}" width="60"></img></div>`    
    }
    document.getElementById('juego').innerHTML = items;
}

getDatosUser();

rellenarFormularioUser();
pintarPanel();