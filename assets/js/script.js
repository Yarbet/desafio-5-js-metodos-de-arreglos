const tareasIniciales = [
    { id: 1, tarea: "Tarea 1", completado: false },
    { id: 2, tarea: "Tarea 2", completado: true },
    { id: 3, tarea: "Tarea 3", completado: false },
  ];

  let tareas = tareasIniciales;

  function mostrarTareas(tareas) {
    const tareasContainer = document.getElementById("tareas-container");
    tareasContainer.innerHTML = "";

    tareas.forEach((tarea, index) => {
      const listItem = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tarea.completado;
      checkbox.dataset.id = index + 1;
      checkbox.addEventListener("change", manejadorCambiar);

      const tareaTexto = document.createElement("span");
      tareaTexto.textContent = tarea.tarea;
      tareaTexto.style.textDecoration = tarea.completado ? "line-through" : "none";

      const eliminarBoton = document.createElement("button");
      eliminarBoton.textContent = "Eliminar";
      eliminarBoton.dataset.id = index + 1;
      eliminarBoton.addEventListener("click", manejadorEliminar);

      listItem.appendChild(checkbox);
      listItem.appendChild(tareaTexto);
      listItem.appendChild(eliminarBoton);

      tareasContainer.appendChild(listItem);
    });

    actualizarContadores(tareas);
  }

  function agregarTarea({ target }) {
    const input = document.getElementById("agregar-tarea-input");


    if (!input.value.trim()) {
      return;
    }

    const tarea = {
      id: tareas.length + 1,
      tarea: input.value,
      completado: false,
    };

    tareas.push(tarea);
    mostrarTareas(tareas);
    input.value = "";
  }

  function eliminarTarea(id) {
    tareas = tareas.filter((tarea, index) => {
      if (tarea.id === id) {
        return false;
      }

      return true;
    });

    mostrarTareas(tareas);
  }

  function manejadorEliminar({ target }) {
    if (target.tagName.toLowerCase() === "button") {
      eliminarTarea(parseInt(target.dataset.id));
    }
  }

  function manejadorCambiar({ target }) {
    if (target.tagName.toLowerCase() === "input" && target.type === "checkbox") {
      const tarea = tareas[parseInt(target.dataset.id) - 1];
      tarea.completado = !tarea.completado;
      mostrarTareas(tareas);
    }
  }

  function actualizarContadores(tareas) {
    const pendientes = document.getElementById("tareas-pendientes");
    const realizadas = document.getElementById("tareas-realizadas");

    pendientes.textContent = tareas.filter((tarea) => !tarea.completado).length;
    realizadas.textContent = tareas.filter((tarea) => tarea.completado).length;

    const total = document.getElementById("tareas-total");
    total.textContent = tareas.length;
  }

  document.getElementById("agregar-tarea-btn").addEventListener("click", agregarTarea);

  document.getElementById("agregar-tarea-input").addEventListener("click", (e) => {
    if (e.keyCode === 13) {
      agregarTarea(e);
    }
  });

  mostrarTareas(tareas);


 