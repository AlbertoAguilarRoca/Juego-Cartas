
function iniciarPartida() {
    const baraja = document.querySelectorAll('.back');
    const mazo = duplicaCartas(generaCartas(baraja));
    asignarImagen(baraja, mazo);
    iniciarTablero(mazo);
}

//Recorremos todas las cartas para insertarle la imagen
function asignarImagen(baraja, mazo) {
    baraja.forEach(function (carta, i) {
        const img = document.createElement('img');
        img.src = mazo[i].url;
        let data_id = document.createAttribute('data-id');
        data_id.value = mazo[i].id;
        img.setAttributeNode(data_id);
    
        let data_status = document.createAttribute('data-status');
        data_status.value = mazo[i].status;
        img.setAttributeNode(data_status);
    
        carta.appendChild(img);
    });
}

//Genera un mazo de cartas. en este caso de la mitad de cartas
//que hay en el index
function generaCartas(baraja) {
    const mazo = [];
    for (let i = 0; i < baraja.length / 2; i++) {
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