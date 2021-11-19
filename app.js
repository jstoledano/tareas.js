require('colors');

const {mostrarMenu, pausa} = require('./helpers/mensajes');

console.clear();

async function main() {
    let opt = '';

    do {
        opt = await mostrarMenu();
        console.log({opt});
        await pausa();
    } while(opt !== '0');

}


main();