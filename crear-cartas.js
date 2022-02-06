

/*function iniciarPartida() {
    const baraja = document.querySelectorAll('.back');
    const mazo = duplicaCartas(generaCartas(baraja));
    //Guardo el mazo en la sesion para utilizarlo en multijuegador
    sessionStorage.setItem("mazo", JSON.stringify(mazo));
    asignarImagen(baraja, mazo);
    iniciarTablero(mazo);
}*/

//Recorremos todas las cartas para insertarle la imagen
function asignarImagen(baraja, mazo) {
    baraja.forEach(function (carta, i) {
        const img = document.createElement('img');
        img.src = mazo[i].url;
        carta.appendChild(img);
    });
}

//Genera un mazo de cartas. en este caso de la mitad de cartas
//que hay en el index
function generaCartas(baraja) {
    const mazo = [];
    for (let i = 0; i < baraja / 2; i++) {
        let numero = Math.floor((Math.random() * (19 - 0 + 1)) + 0);
        let encontrado = mazo.find(i => i === cartas[numero]);
    
        //Si se genera una carta ya existente, se vuelve a crear una nueva
        while(encontrado != undefined) {
            console.log('Entro en while');
            numero = Math.floor((Math.random() * (19 - 0 + 1)) + 0);
            encontrado = mazo.find(i => i === cartas[numero]);
        }
        mazo.push(cartas[numero]);
    }
    return mazo;
}

//Duplica las cartas de un array y las baraja
function duplicaCartas(arr) {
    let total = arr.length;
    arr.forEach(function (item, i) {
        arr[i + total] = arr[i];
    });
    return arr.sort(function (a, b) {return 0.5 - Math.random()});
}

