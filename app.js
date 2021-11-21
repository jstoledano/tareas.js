require('colors');


const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
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

            case '5':
                console.log(`Tareas terminadas`);
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log(`Tarea borrada`.bgRed);
                    }
                }
            break;

        }

        guardarDB(tareas.listadoArr);
        await pausa();
    } while(opt !== '0');
}



main();