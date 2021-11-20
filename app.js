require('colors');


const {
    inquirerMenu, 
    pausa,
    question 
    } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

async function main() {
    let opt = '';
    const tareas = new Tareas();

    do {
        console.clear();
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // crear tarea
                const esc = await question('Ingrese una descripción: ');
                tareas.crearTarea(esc);
                break;
            case '2':
                // listar tareas
                console.log(tareas._listado);
                break;
        }

        console.log({opt});
        await pausa();
    } while(opt !== '0');
}



main();