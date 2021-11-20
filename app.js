require('colors');

const {inquirerMenu} = require('./helpers/inquirer');

console.clear();

async function main() {
    let opt = '';

    do {
        opt = await inquirerMenu();
        console.log({opt});
    } while(opt !== '0');

}


main();