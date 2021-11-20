const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: '1', name: '1. Crear tarea'},
            {value: '2', name: '2. Listar tareas'},
            {value: '3', name: '3. Listar tareas completadas'},
            {value: '4', name: '4. Listar tareas pendientes'},
            {value: '5', name: '5. Completar tarea'},
            {value: '6', name: '6. Borrar tarea'},
            {value: '0', name: '0. Salir'}
        ]
    }
];

const inquirerMenu = async () => {
    console.log('========================='.green);
    console.log('  Seleccione una opción'.red);
    console.log('========================='.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async () => {
    const question = {
        input: process.stdin,
        output: process.stdout,
        name: 'enter',
        message: `Presione ${'ENTER'.red} para continuar\n`
    };

    console.log(`\n`);
    await inquirer.prompt(question);
};

const question = async(message) => {
    const question = {
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

    const {desc} = await inquirer.prompt(question);

    return desc;
};

module.exports = {
    inquirerMenu,
    pausa,
    question
};
