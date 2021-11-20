require('colors');


const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu, 
    pausa,
    leerInput 
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

async function main() {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasDesdeArreglo(tareasDB);
    }
    
    do {
        console.clear();
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // crear tarea
                const esc = await leerInput('Ingrese una descripción: ');
                tareas.crearTarea(esc);
                break;
            case '2':
                // listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                console.log('Tareas Completadas');
                tareas.listarCompletadasPendientes(true);
                break;
            case '4':
                console.log('Tareas pendientes');
                tareas.listarCompletadasPendientes(false);
                break;
        }

        guardarDB(tareas.listadoArr);
        await pausa();
    } while(opt !== '0');
}



main();