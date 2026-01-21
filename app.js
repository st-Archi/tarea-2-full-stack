// 1. CLASE TAREA: El modelo (POO)
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class GestorDeTareas {
    constructor() {
        this.tareas = [];
        this.input = document.querySelector('#inputTarea');
        this.listaUl = document.querySelector('#listaTareas');
        
        document.querySelector('#btnAgregar').addEventListener('click', () => {
            this.agregarTarea();
        });
    }

    agregarTarea() {
        const texto = this.input.value;
        if (texto.trim() === "") return;

        const nueva = new Tarea(texto);
        this.tareas = [...this.tareas, nueva];

        this.input.value = "";
        this.mostrar();
    }

    eliminar(indice) {
        this.tareas.splice(indice, 1);
        this.mostrar();
    }

    editar(indice) {
        const nuevo = prompt("Editar tarea:", this.tareas[indice].nombre);
        if (nuevo) {
            this.tareas[indice].nombre = nuevo;
            this.mostrar();
        }
    }

    mostrar() {
        this.listaUl.innerHTML = "";
        this.tareas.forEach((tarea, indice) => {
            this.listaUl.innerHTML += `
                <li>
                    <span>${tarea.nombre}</span>
                    <div class="acciones">
                        <button onclick="control.editar(${indice})">Editar</button>
                        <button class="btn-borrar" onclick="control.eliminar(${indice})">Borrar</button>
                    </div>
                </li>
            `;
        });
    }
}

const control = new GestorDeTareas();