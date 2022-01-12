// Para llevar la cuenta de la carta girada
var girada = false;
var carta1;
var carta2;

document.querySelectorAll('.carta').forEach(item => {
    item.addEventListener("click", function() {   

        // Si una carta ha sido girada
        if (girada) {
            // Y si no es la misma carta girada
            if (carta1 != item.id) {
            carta2 = item.id;
            girarCarta(carta2);
            setTimeout(comprobarCartas, 1000);
            }
        }
        // Si no se ha girado la primera carta
        else {
            // Guarda en la variable el id
            carta1 = item.id;
            // Le da la vuelta a la carta con dicho id
            girarCarta(carta1);
            // girada en true para prosegir el juego
            girada = true;
        }
        
    });
});

function girarCarta(id) {  
    if(document.getElementById(id).style.transform == "rotateY(180deg)") {
        document.getElementById(id).style.transform = "none";
    }else {
        document.getElementById(id).style.transform = "rotateY(180deg)";
    }
}

// Ahora mismo en esta funcion solo se le da la vuelta a ambas cartas
function comprobarCartas() {
    girarCarta(carta1);
    girarCarta(carta2);
    girada = false;
}