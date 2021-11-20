require('colors');

const {inquirerMenu, pausa} = require('./helpers/inquirer');

console.clear();

async function main() {
    let opt = '';

    do {
        console.clear();
        opt = await inquirerMenu();
        console.log({opt});
        await pausa();
    } while(opt !== '0');

}


main();