// aca traigo los elementos del HTML, el formulario, el input para la entrada de datos y el listado de tareas

const formulario = document.getElementById("form-lista-tareas");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("lista-tareas");



// fetch para agregar tarea

// escucha el click del boton de agregar tarea
formulario.addEventListener("submit", async function (event) {
    event.preventDefault();


    // aca valido si se obtuvo el valor del input y verifica que la tarea no este vacia
    const tarea = inputTarea.value.trim();

    if (tarea === "") {
        console.log("No puedes agregar una tarea vacia.");
        return;
    }


    // si es correcto, envia la tarea al servidor con el fetch y espera la respuesta antes de continuar, mediante POST, ya que es mas seguro que con GET porque se muestra en la URL, el body envia
    // el objeto con la tarea en formato JSON
    try {
        const response = await fetch("../controlador/crearTareaController.php", {
            method: "POST",
            body: JSON.stringify({ tarea: tarea }),
            headers: { "Content-Type": "application/json" }
        });

        // Aca espera que el servidor responda y convierte la respuesta a un objeto 
        const datos = await response.json();

        // esto por si hay un error, mostrarlo y ver que pasa
        console.log("Respuesta del servidor; ", datos);


        // si no hay errores, guarda la tarea exitosamente en la bd y la muestra en la pagina
        if (datos.mensaje) {
            console.log("Tarea guardada exitosamente");

            // aca limpia el input de tarea para agregar nuevas y no tener que borrar manualmente
            inputTarea.value = ""; //limpiar campo
            mostrarTareas();

        }

        // sino, muestra el error
        else {
            console.log("Tarea no guadrada", datos.error);

        }
    }


    catch (error) {
        console.error("Error en el fetch: ", error);

    }

});



// Fetch para modificar la tarea y traer los datos de la tarea en el modal que se abre
document.addEventListener('DOMContentLoaded', () => {
    const modalEditar = document.getElementById('modal-editar');
    const btnCerrarModal = document.getElementById('cerrar-modal');
    const inputEditarTarea = document.getElementById('editar-tarea');
    const inputEditarTareaId = document.getElementById('editar-tarea-id');
    const btnGuardarCambios = document.getElementById('guardar-cambios');


    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-editar')) {
            const btnEditar = e.target.closest('.btn-editar');
            const idTarea = btnEditar.getAttribute('data-id');

            // Obtener el nombre de la tarea desde la fila correspondiente, antes era el td 1, pero como añadimos el icono de mas, se cambio al 2, que en el array es 1
            const nombreTarea = btnEditar.closest('tr').querySelectorAll('td')[1].textContent;

            // Mostrar el modal
            modalEditar.style.display = 'flex';

            // Asignar valores a los inputs
            inputEditarTareaId.value = idTarea;  // ID oculto
            inputEditarTarea.value = nombreTarea; // Nombre actual
        }
    });

    // Cerrar el modal
    btnCerrarModal.addEventListener('click', () => {
        modalEditar.style.display = 'none';
    });

    // Guardar cambios al hacer clic en "Guardar"
    btnGuardarCambios.addEventListener('click', async () => {
        const idTarea = inputEditarTareaId.value.trim();
        const nuevoNombre = inputEditarTarea.value.trim();

        if (!idTarea || !nuevoNombre) {
            console.error("ID o nombre de tarea no válidos");
            return;
        }

        try {
            const respuesta = await fetch("../controlador/modificarTareaController.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tareaID: idTarea,
                    tarea: nuevoNombre
                })
            });

            const resultado = await respuesta.json();

            if (resultado.mensaje) {
                console.log("éxito " + resultado.mensaje);
                modalEditar.style.display = 'none'; // Cerrar modal
                mostrarTareas(); // Actualizar la tabla de tareas
            } else {
                console.error("Error al actualizar: ", resultado.error);
            }

        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    });
});




// fetch para eliminar la tarea
document.addEventListener('click', async (e) => {

    if (e.target.closest('.btn-eliminar')) {
        const idTarea = e.target.getAttribute('data-id');


        //  confirmar antes de eliminar
        const confirmar = window.confirm("Seguro que deseas eliminar esta tarea?");

        if (!confirmar) return;


        try {
            const respuesta = await fetch("../controlador/eliminarTareaController.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tareaID: idTarea })
            });

            const resultado = await respuesta.json();

            if (resultado.mensaje) {
                console.log("exito crack" + resultado.mensaje);


                // actualiza la tabla despues de eliminar
                mostrarTareas();
            } else {
                console.error("Error al eliminar: ", resultado.error);
            }


        } catch (error) {
            console.error("error en la solicitud", error);
        }
    }
});



// Fetch para completar la tarea
document.addEventListener('click', async (e) => {
    if (e.target.closest('.btn-completar')) {
        const btnCheck = e.target.closest('.btn-completar');

        // Obtener el ID de la tarea
        const idTarea = btnCheck.getAttribute('data-id');

        // Obtener el nombre de la tarea
        const tareaElemento = btnCheck.closest('tr').querySelector('td:nth-child(2)');
        const nombreTarea = tareaElemento.textContent.trim();

        // Determinar si la tarea está completada (1) o no (0)
        const estaCompleta = tareaElemento.querySelector('s') ? 0 : 1;

        try {
            // Realizar el fetch para actualizar en la base de datos
            const respuesta = await fetch("../controlador/completarTareaController.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tareaID: idTarea,
                    nombreTarea: nombreTarea,
                    estaCompleta: estaCompleta
                })
            });

            const resultado = await respuesta.json();

            if (resultado.mensaje) {
                console.log("éxito " + resultado.mensaje);

                // 🔄 Actualizar la tabla para reflejar el cambio
                mostrarTareas();
            } else {
                console.error("Error al actualizar: ", resultado.error);
            }

        } catch (error) {
            console.error("Error en el fetch: ", error);
        }
    }
});




// Fetch para traer la data de la base de datos Mysql y pintarlos en la tabla
const mostrarTareas = async () => {
    try {
        const respuesta = await fetch("../controlador/mostrarTareasController.php");
        const tareas = await respuesta.json();

        console.log("Tareas obtenidas: ", tareas);

        const tabla = document.querySelector(".contenedor-tabla table");

        // Limpiamos la tabla antes de agregar nuevas tareas
        tabla.innerHTML = `
            <tr>
                <th>Detalle</th>
                <th>Tareas</th>
                <th>Acciones</th>
            </tr>
        `;


        tareas.forEach((tarea) => {
            const fila = document.createElement("tr");

            // Si la tarea está completada (1), la mostramos tachada con <s>
            const nombreTarea = tarea.estaCompleta == 1
                ? `<s style="color: #808080">${tarea.nombreTarea}</s>`
                : tarea.nombreTarea;

            // Crear una fila con el contenido
            fila.innerHTML = `
                <td>
                    <i class="fa-solid fa-plus btn-detalles" 
                       data-id="${tarea.tareaID}" 
                       data-fecha="${tarea.fechaCreacion}">
                    </i>
                </td>
                <td>${nombreTarea}</td>
                <td>
                    <i class="fa-solid fa-xmark btn-eliminar" data-id="${tarea.tareaID}"></i>
                    <i class="fa-solid fa-pencil btn-editar" data-id="${tarea.tareaID}"></i>
                    <i class="fa-solid fa-check btn-completar" data-id="${tarea.tareaID}"></i>
                </td>
            `;

            // Crear una fila separadora
            const separador = document.createElement("tr");
            separador.innerHTML = `<td colspan="3"><hr></td>`; // Para que el <hr> ocupe toda la fila

            // Agregar la fila de la tarea y el separador a la tabla
            tabla.appendChild(fila);
            tabla.appendChild(separador);
        });




    } catch (error) {
        console.error("Error: ", error);
    }
};

// Ejecutar mostrarTareas() al cargar la página
document.addEventListener("DOMContentLoaded", mostrarTareas);





// Mostrar/ocultar detalles (fecha de creación)
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-detalles')) {
        const btnDetalles = e.target.closest('.btn-detalles');
        const fila = btnDetalles.closest('tr');
        const fechaCreacion = btnDetalles.getAttribute('data-fecha');

        // Buscar si ya existe una fila extra (para mostrar la fecha)
        let detallesFila = fila.nextElementSibling;

        // Si la fila de detalles ya existe, la eliminamos (toggle)
        if (detallesFila && detallesFila.classList.contains('detalle-fila')) {
            detallesFila.remove();
        } else {
            // Si no existe, la creamos y la insertamos después de la fila actual
            detallesFila = document.createElement('tr');
            detallesFila.className = 'detalle-fila';
            detallesFila.innerHTML = `
                <td colspan="3" style="color: #818181; padding-left: 25px;">
                    📅 Fecha de creación: ${fechaCreacion}
                </td>
            `;
            fila.parentNode.insertBefore(detallesFila, fila.nextSibling);
        }
    }
});





