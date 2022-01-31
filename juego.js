var girada = false;
var intentos = 0;
var puntos = 0;

function iniciarTablero(mazo) {

    console.log(mazo);
    
    var carta1;
    var carta2;

    document.querySelectorAll('.carta').forEach(item => {
        item.addEventListener("click", function() {   
            // Si una carta ha sido girada
            if (girada) {
                // Guarda en la variable el id del div
                carta2 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta2-1].status) {
                    // Y si no es la misma carta girada
                    if (carta1 != item.id) {
                        // Le da la vuelta a la carta con dicho id
                        // Esto es como hacer un mostrarCarta(carta2)
                        girarCarta(carta2);
                        // Se quedan ambas cartas 1 segundo descubiertas y se llama a cartasGiradas()
                        setTimeout(cartasGiradas, 500, mazo, carta1, carta2);
                    }
                }
            }
    
            // Si no se ha girado la primera carta
            else {
                // Guarda en la variable el id del div
                carta1 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta1-1].status) {
                    // Le da la vuelta a la carta con dicho id
                    // Esto es como hacer un mostrarCarta(carta1)
                    girarCarta(carta1);
                    // girada en true para prosegir el juego
                    girada = true;
                }
            }
        });
    });
}

// Esta funcion funciona tanto como mostrarCarta() como ocultarCarta()
function girarCarta(id) {  
    if(document.getElementById(id).style.transform == "rotateY(180deg)") {
        document.getElementById(id).style.transform = "none";
    }else {
        document.getElementById(id).style.transform = "rotateY(180deg)";
    }
}

// Solo se comprueba si el id de las cartas dadas la vuelta sean iguales
function comprobarCartas(mazo, carta1, carta2) {
    if (mazo[carta1-1].id == mazo[carta2-1].id) {
        return true;
    }
    else {
        return false;
    }
}

// Funcion cartasGiradas() que hace lo siguiente
function cartasGiradas(mazo, carta1, carta2) {

    // En caso de que sean iguales (se ha acertado la pareja):
    if (comprobarCartas(mazo, carta1, carta2)) {

        // Suma 1 punto y actualiza el marcador de puntos
        puntos++;
        document.getElementById("nPuntos").innerHTML = puntos;

        // En el array de objetos del mazo de cartas se establece que el
        // status sea true para que no puedan ser dada la vuelta
        mazo[carta1-1].status = true;
        mazo[carta2-1].status = true;

        comprobarJuegoFinalizado(mazo);

    }
    else {
        // Si no son iguales (no se ha acertado la pareja)
        // simplemente se les da la vuelta para seguir jugando
        // Esto es el equivalente de hacer ocultarCarta(carta1) y ocultarCarta(carta2)
        girarCarta(carta1);
        girarCarta(carta2);
    }

    // Esta variable se pasa a false para continuar el juego
    girada = false;

    // Suma un intento aunque haya acertado o no una pareja y actualiza el marcador
    intentos++;
    document.getElementById("nIntentos").innerHTML = intentos;
}

// Funcion comprobarJuegoFinalizado() que hace lo siguiente
function comprobarJuegoFinalizado(mazo) {
    // Guardar en la variable el numero de cartas
    // Tambien se puede hacer con: 
    // var nCartas = document.querySelectorAll('.carta').length;
    var nCartas = mazo.length;
    // Contador de todos los true que haya
    var contadorAcertados = 0;
        // Bucle que recorre el array buscando los true
        for (let i = 0; i < nCartas; i++) {
            if (mazo[i].status) {
                contadorAcertados++;
            }

            // Cuando todas las cartas tienen true acaba el juego
            // mostrando un popup con informacion del tiempo gastado y el numero de intentos
            // Y un boton de reiniciar el juego
            if (contadorAcertados == nCartas) {
                document.getElementById("contenedor").style.display = "none";
                document.getElementById("popup").style.display = "flex";

                var mensajeFinal = document.getElementById('resultado-juego');
                var tiempoTotal = document.getElementById("nTiempo");
                
                mensajeFinal.innerText = `Enhorabuena. Has necesitado ${intentos} intentos y 
                ${tiempoTotal.innerText} de tiempo.`;

                juegoIniciado = false;
                tiempoTotal.innerText = '00:00:00';
            }
        }
        
}

