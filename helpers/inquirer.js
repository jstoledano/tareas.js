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

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
};

