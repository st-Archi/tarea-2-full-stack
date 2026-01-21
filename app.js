// 1. Clase Tarea
class Tarea {
    constructor(nombre, completada = false) {
        this.nombre = nombre;
        this.completada = completada;
    }
}

// 2. Clase Gestor de Tareas
class GestorDeTareas {
    constructor() {
        // Cargar desde LocalStorage o iniciar vacío
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        this.listaUl = document.getElementById('lista-tareas');
        this.input = document.getElementById('nueva-tarea');
        this.btnAgregar = document.getElementById('btn-agregar');

        // Escuchar evento click
        this.btnAgregar.addEventListener('click', () => this.agregarTarea());
        
        this.renderizarTareas();
    }

    agregarTarea() {
        const nombre = this.input.value.trim();
        if (nombre === "") {
            alert("Por favor, escribe una tarea.");
            return;
        }

        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        this.guardarYActualizar();
        this.input.value = "";
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardarYActualizar();
    }

    editarTarea(index) {
        const nuevoNombre = prompt("Edita tu tarea:", this.tareas[index].nombre);
        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
            this.tareas[index].nombre = nuevoNombre.trim();
            this.guardarYActualizar();
        }
    }

    guardarYActualizar() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        this.renderizarTareas();
    }

    renderizarTareas() {
        this.listaUl.innerHTML = '';
        
        this.tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${tarea.nombre}</span>
                <div class="botones-tarea">
                    <button class="btn-editar" onclick="gestor.editarTarea(${index})">Editar</button>
                    <button class="btn-eliminar" onclick="gestor.eliminarTarea(${index})">Eliminar</button>
                </div>
            `;
            this.listaUl.appendChild(li);
        });
    }
}

// Inicializar la aplicación

const gestor = new GestorDeTareas();
