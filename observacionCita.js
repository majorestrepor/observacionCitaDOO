
const citasData = {
    '12345': {
        medico: "Dr. Juan Pérez",
        citaAsociada: "Confama - Piso 1-101",
        observaciones: ["Observación 1 de la cita 12345", "Observación 2 de la cita 12345"]
    },
    '67890': {
        medico: "Dra. María Gómez",
        citaAsociada: "CityMedica - Piso 2-202",
        observaciones: ["Observación 1 de la cita 67890"]
    },
    '66165161': {
        medico: "Dr. Carlos Ramírez",
        citaAsociada: "El Prado - Piso 4-304",
        observaciones: ["Observación 1 de la cita 66165161"]
    }
};


function validarLongitudObservacion(observacion) {
    const longitud = observacion.trim().length; 
    return longitud >= 1 && longitud <= 255;
}

function buscarCita() {
    const idCita = document.getElementById('idCita').value;
    const errorIdCita = document.getElementById('errorIdCita');

    
    errorIdCita.textContent = '';

   
    if (idCita.length < 1 || idCita.length > 10) {
        errorIdCita.textContent = "El ID de la cita debe tener entre 1 y 10 caracteres.";
        return;
    }

    
    const citaData = citasData[idCita];

    if (citaData) {
     
        document.getElementById('cita').value = citaData.citaAsociada;
        document.getElementById('medico').value = citaData.medico;

       
        mostrarObservaciones(citaData.observaciones);
    } else {
        errorIdCita.textContent = "Cita no encontrada.";
        document.getElementById('cita').value = '';
        document.getElementById('medico').value = '';
        document.getElementById('observacionesContainer').innerHTML = ''; // Limpiar observaciones
    }
}

function mostrarObservaciones(observaciones) {
    const container = document.getElementById('observacionesContainer');
    container.innerHTML = ''; 

    observaciones.forEach((observacion, index) => {
        const numeroObservacion = `obs${(index + 1).toString().padStart(3, '0')}`; // Crear identificador único (obs001, obs002)
        
        const div = document.createElement('div');
        div.classList.add('observacion');

       
        div.innerHTML = `
            <label for="observacion${index}">${numeroObservacion}</label>
            <textarea id="observacion${index}" rows="4">${observacion}</textarea>
            <span class="error-message" id="errorObservacion${index}"></span>
            <button class="guardarBtn" onclick="guardarObservacion(${index})">Guardar</button>
            <button class="eliminarBtn" onclick="eliminarObservacion(${index})">Eliminar</button>
        `;
        container.appendChild(div);
    });
}


function guardarObservacion(index) {
    const idCita = document.getElementById('idCita').value;
    const observacion = document.getElementById(`observacion${index}`).value;
    const errorMensaje = document.getElementById(`errorObservacion${index}`);

  
    if (!validarLongitudObservacion(observacion)) {
        errorMensaje.textContent = 'La observación debe tener entre 1 y 255 caracteres.';
        return;
    }

    errorMensaje.textContent = '';

    const citaData = citasData[idCita];
    if (citaData) {
        citaData.observaciones[index] = observacion;
        alert(`Observación actualizada: ${observacion}`);
    }
}


function agregarObservacion() {
    const idCita = document.getElementById('idCita').value;
    const citaData = citasData[idCita];

    if (citaData) {
        const container = document.getElementById('observacionesContainer');
        const newIndex = citaData.observaciones.length;
        const numeroObservacion = `obs${(newIndex + 1).toString().padStart(3, '0')}`;

        const div = document.createElement('div');
        div.classList.add('observacion');
        div.innerHTML = `
            <label for="observacion${newIndex}">${numeroObservacion}</label>
            <textarea id="observacion${newIndex}" rows="4" placeholder="Nueva observación"></textarea>
            <span class="error-message" id="errorObservacion${newIndex}"></span>
            <button class="guardarBtn" onclick="guardarObservacion(${newIndex})">Guardar</button>
            <button class="eliminarBtn" onclick="eliminarObservacion(${newIndex})">Eliminar</button>
        `;
        container.appendChild(div);

        
        citaData.observaciones.push("");
    }
}


function eliminarObservacion(index) {
    const idCita = document.getElementById('idCita').value;
    const citaData = citasData[idCita];

    if (citaData) {
       
        citaData.observaciones.splice(index, 1);
        alert(`Observación eliminada`);
        buscarCita(); 
    }
}
