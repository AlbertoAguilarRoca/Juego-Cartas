//Localizamos el boton y al pusarlo aparece el contenedor
let boton = document.querySelector("#boton");

var horas = 0;
var minutos = 0;
var segundos = 0;

const temporizador = document.getElementById('tiempo');
var juegoIniciado = false;

boton.addEventListener("click", function() {
    if (document.querySelector("#nombreJug").value == "") {
        alert("Por favor, rellene su nombre.");
        document.querySelector("#nombreJug").focus();
    }
    else {
        establecerDificultad();
        iniciarPartida();
        document.querySelector("#inicio").style.display = "none";
        document.querySelector("#contenedor").style.display = "flex";
        
        document.querySelector("#contadores").style.display = "initial";
        document.querySelector("#nombreJugador").innerHTML = document.querySelector("#nombreJug").value;
        document.querySelector("#mensaje_nombre").innerHTML = document.querySelector("#nombreJug").value;

        juegoIniciado = true;
    }
});

function establecerDificultad() {
    let creadorDivsCartas = "";
    let nCartas;
    switch (document.getElementById("dificultad").value) {
        case '1':
            // facil
            nCartas = 6;
            break;

        case '2':
            // intermedio
            nCartas = 8;
            break;

        case '3':
            // dificil
            nCartas = 10;
            break;

        case '4':
            // muy dif
            nCartas = 14;
            break;
    
        default:
            alert("error");
            break;
    }

    for (let i = 1; i <= nCartas; i++) {

        creadorDivsCartas += "<div id='"+i+"' class='carta'>";
        creadorDivsCartas += "<div class='front'>";
        creadorDivsCartas += "<div class='cover'>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "<div class='back'>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "</div>";
        
    }

    document.getElementById("contenedor").innerHTML = creadorDivsCartas;
}


setInterval(incrementar, 1000);


function incrementar() {

    var tempHoras = '';
    var tempMinutos = '';
    var tempSegundos = '';

    if(juegoIniciado) {

        if(segundos < 59) {
            segundos++;
        } else {
            minutos++;
            segundos = 0;
        }
    
        if(minutos == 60) {
            horas++;
            minutos = 0;
        }

        if(horas < 10) { 
            tempHoras = '0' + horas; 
        } else {
            tempHoras = horas
        }

        if(minutos < 10) { 
            tempMinutos = '0' + minutos; 
        } else {
            tempMinutos = minutos;
        }

        if(segundos < 10) { 
            tempSegundos = '0' + segundos; 
        } else {
            tempSegundos = segundos;
        }
    
        document.getElementById("nTiempo").innerText = tempHoras + ':'+tempMinutos+':'+tempSegundos;
    }

}