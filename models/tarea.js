const { v4: uuidv4 } = require('uuid');

class Tarea {
    get completadoEn() {
        return this._completadoEn;
    }
    set completadoEn(value) {
        this._completadoEn = value;
    }

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = this._completadoEn;
    }
}

module.exports = Tarea;