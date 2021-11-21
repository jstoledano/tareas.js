const Tarea = require('./tarea');

class Tareas {
    constructor() {
        this._listado = {};
    }

    borrarTarea(id='') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(k => {
            const tarea = this._listado[k];
            listado.push(tarea);
        });
        return listado;
    }

    crearTarea (desc='') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        return tarea;
    }

    cargarTareasDesdeArreglo(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    _imprimirListado(listado) {
        listado.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const {desc, completadoEn} = tarea;
            const done = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${done}`);
        });
    }

    listadoCompleto() {
        let listado = [];
        console.log();
        this._imprimirListado(this.listadoArr);
        return listado;
    }

    listarCompletadasPendientes(completadas = true) {
        let listado = completadas ? 
              this.listadoArr.filter(t => t.completadoEn)
            : this.listadoArr.filter(t => !t.completadoEn);
        this._imprimirListado(listado);
        return listado;
    }
}


module.exports = Tareas;