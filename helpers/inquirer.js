const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: '1', name: `${'1.'.green} Crear tarea`},
            {value: '2', name: `${'2.'.green} Listar tareas`},
            {value: '3', name: `${'3.'.green} Listar tareas completadas`},
            {value: '4', name: `${'4.'.green} Listar tareas pendientes`},
            {value: '5', name: `${'5.'.green} Completar tarea`},
            {value: '6', name: `${'6.'.green} Borrar tarea`},
            {value: '0', name: `${'0.'.green} Salir`}
        ]
    }
];

const inquirerMenu = async () => {
    console.log('========================='.green);
    console.log('  Seleccione una opción'.bold.white);
    console.log('========================='.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async () => {
    const pregunta = {
        input: process.stdin,
        output: process.stdout,
        name: 'enter',
        message: `Presione ${'ENTER'.red} para continuar\n`
    };

    console.log(`\n`);
    await inquirer.prompt(pregunta);
};

const leerInput = async(message) => {
    const pregunta = {
        type: 'input',
        message,
        name: 'desc',
        validate: (value) => {
            if (value.length > 0) {
                return true;
            } else {
                return 'Ingrese una descripción';
            }
        }
    };

    const {desc} = await inquirer.prompt(pregunta);

    return desc;
};

const listadoTareasBorrar = async (tareas=[]) => {
    const choices = tareas.map((tarea, id) => {
        const idx = `${id + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    });
    choices.unshift({value: '0', name: `0. Cancelar`.bgGreen});
    const tarea_seleccionada = [{
        type: 'list',
        name: 'tarea_id',
        message: 'Seleccione la tarea a borrar',
        choices
    }];
    const {tarea_id} = await inquirer.prompt(tarea_seleccionada);
    return tarea_id;
};

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name:'ok',
        message
    }];
    const {ok} = await inquirer.prompt(question);
    return ok;
};

const mostrarListadoCheckList = async (tareas=[]) => {
    const choices = tareas.map((tarea, id) => {
        const idx = `  ${id + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'tareas_id',
        message: 'Seleccione las tareas completadas',
        choices
    }];
    const {tareas_id} = await inquirer.prompt(pregunta);
    return tareas_id;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
};

