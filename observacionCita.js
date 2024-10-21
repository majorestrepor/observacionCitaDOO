document.addEventListener("DOMContentLoaded", () => {
    setInterval(actualizarReloj, 1000);
});

function obtenerDatosCita() {
    const idCita = document.getElementById('idCita').value;
    const errorIdCita = document.getElementById('errorIdCita');

    // Validar la longitud del ID de la cita
    if (idCita.length < 1 || idCita.length > 10) {
        errorIdCita.style.display = "block";
        errorIdCita.textContent = "El ID de la cita debe tener entre 1 y 10 números.";
        return;
    } else {
        errorIdCita.style.display = "none";
    }

    // Simular datos recuperados (puedes conectar esto con una API)
    if (idCita === "12345") {
        document.getElementById('cita').value = "CC-45451313-Piso 1-101-Confama-Rionegro-Antioquia";
        document.getElementById('medico').value = "Dr. Juan Pérez";
        cargarObservacionesPrevias(idCita);
    } else {
        document.getElementById('cita').value = "";
        document.getElementById('medico').value = "";
        document.getElementById('observacionesContainer').innerHTML = ''; // Limpiar observaciones
    }
}

function preguntarObservaciones() {
    document.getElementById('cantidadObservacionesContainer').style.display = "block";
}

function mostrarObservaciones() {
    const cantidad = document.getElementById('cantidadObservaciones').value;
    const observacionesContainer = document.getElementById('observacionesContainer');
    observacionesContainer.innerHTML = '';

    for (let i = 1; i <= cantidad; i++) {
        const observacionDiv = document.createElement('div');
        observacionDiv.classList.add('form-group');
        observacionDiv.innerHTML = `
            <label for="observacion${i}">Observación ${i}</label>
            <textarea id="observacion${i}" rows="4" placeholder="Ingrese la observación ${i}" maxlength="255"></textarea>
        `;
        observacionesContainer.appendChild(observacionDiv);
    }
}

function crearObservacion() {
    const idCita = document.getElementById('idCita').value;
    const cantidadObservaciones = document.getElementById('cantidadObservaciones').value;
    const observacionesContainer = document.getElementById('observacionesContainer');
    let hayError = false;

    if (!idCita) {
        alert("Debe ingresar un ID de cita válido.");
        hayError = true;
    }

    for (let i = 1; i <= cantidadObservaciones; i++) {
        const observacion = document.getElementById(`observacion${i}`).value;
        if (observacion.length < 1) {
            alert(`La observación ${i} no puede estar vacía.`);
            hayError = true;
        }
    }

    if (!hayError) {
        alert("Observación creada para la cita: " + idCita);
        // Aquí puedes enviar los datos a un servidor o guardarlos localmente
    }
}

function cargarObservacionesPrevias(idCita) {
    // Simular la carga de observaciones desde una base de datos o API
    const observacionesContainer = document.getElementById('observacionesContainer');
    observacionesContainer.innerHTML = '';

    // Suponiendo que hay 2 observaciones previas para la cita 12345
    if (idCita === "12345") {
        const observacionesPrevias = ["Observación previa 1", "Observación previa 2"];

        observacionesPrevias.forEach((texto, index) => {
            const observacionDiv = document.createElement('div');
            observacionDiv.classList.add('form-group');
            observacionDiv.innerHTML = `
                <label for="observacionPrev${index + 1}">Observación Previa ${index + 1}</label>
                <textarea id="observacionPrev${index + 1}" rows="4" disabled>${texto}</textarea>
            `;
            observacionesContainer.appendChild(observacionDiv);
        });
    }
}

function actualizarReloj() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const anio = ahora.getFullYear();
    
    const reloj = document.getElementById('reloj');
    reloj.innerText = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
}
