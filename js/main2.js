document.addEventListener('DOMContentLoaded', function() {
    let personas = [];
    const personasJSON = localStorage.getItem('personas');
    if (personasJSON) {
        personas = JSON.parse(personasJSON);
    }
    function guardarPersonasEnLocalStorage(personas) {
        localStorage.setItem('personas', JSON.stringify(personas));
    }
    async function guardarPersonasEnServidor(personas) {
        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(personas)
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error al enviar datos al servidor:', error);
        }
    }
    const nombreUsuario = sessionStorage.getItem("nombreUsuario");
    //saludar
    if (nombreUsuario) {
        const saludarDiv = document.getElementById('saludar');
        saludarDiv.textContent = `¡Hola, ${nombreUsuario}! Bienvenido (los registro de pacientes)`;
        setTimeout(function() {
            saludarDiv.textContent = '';
        }, 30000);
    }
    document.getElementById('datosdeentrada').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nomPa').value;
        const apellido = document.getElementById('apePa').value;
        const dni = document.getElementById('dniPa').value;
        const turno = document.getElementById('turnoPa').value;
        if (!nombre || !apellido || !dni || !turno) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes de ingresar todos los datos!'
            })
            return;
        }
        const documentoExistente = personas.some(persona => persona.dni === dni);
        if (documentoExistente) {
            Swal.fire({
                icon: 'error',
                title: 'DNI iguales',
                text: 'Debes de ingresar un DNI diferente'
            })
            return;
        }
        const fechaExistente = personas.some(persona => persona.turno === turno);
        if (fechaExistente) {
            Swal.fire({
                icon: 'error',
                title: 'Turno ya ocupado',
                text: 'Debes de ingresar un turno diferente'
            })
            return;
        }
        Toastify({
            text: "Se guardo con exito",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            duration: 2000
            }).showToast();
        const persona = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            turno: turno
        };
        personas.push(persona);
        guardarPersonasEnLocalStorage(personas);
        guardarPersonasEnServidor(personas);
        document.getElementById('datosdeentrada').reset();
        mostrarDatos(personas);
    });
    document.getElementById('busquedaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const apellidoBuscar = document.getElementById('buscarApellido').value.trim();
        if (!apellidoBuscar) {
            Toastify({
                text: 'Ingrese un apellido para buscar.',
                style: {
                    background: 'linear-gradient(to right, #b40909, #e95d0f)',
                },
                duration: 2000
            }).showToast();
            return;
        }
        const personaEncontrada = personas.find(persona => persona.apellido.toLowerCase() === apellidoBuscar.toLowerCase());
        if (personaEncontrada) {
            const nombreBus = document.getElementById('nombrebus');
            const apellBus = document.getElementById('apellidobus');
            const turnoBus = document.getElementById('turnobus');
            nombreBus.textContent = 'Nombre: ' + personaEncontrada.nombre;
            apellBus.textContent = 'Apellido: ' + personaEncontrada.apellido;
            turnoBus.textContent = 'Fecha del turno: ' + personaEncontrada.turno;
            const btnEliminar = document.getElementById('eliminarPaciente');
            btnEliminar.style.display = 'block';
            btnEliminar.addEventListener('click', function() {
            });
        } else {
            Toastify({
                text: 'Paciente no encontrado.',
                style: {
                    background: 'linear-gradient(to right, #b40909, #e95d0f)',
                },
                duration: 2000
            }).showToast();
        }
    });
    // Función para mostrar los datos guardados
    function mostrarDatos(personas) {
        const datosDiv = document.querySelector('.datos');
        datosDiv.innerHTML = '';
        personas.forEach(function(persona, index) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            const nombreSpan = document.createElement('span');
            nombreSpan.textContent = persona.nombre + ' ' + persona.apellido;
            const turnoP = document.createElement('p');
            turnoP.classList.add('job');
            turnoP.textContent = `DNI: ${persona.dni}`;
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.addEventListener('click', function() {
                // Eliminar la persona del array y actualizar el almacenamiento local
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'Esta seguro de elimar este turno?',
                    text: "Una vez elimando no se podra recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, estoy seguro!',
                    cancelButtonText: 'No, cancelar!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'El turno fue eliminado.',
                        'success',
                        personas.splice(index, 1),
                        guardarPersonasEnLocalStorage(personas),
                        mostrarDatos(personas)
                    )
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'El turno no fue borrado :)',
                        'error'
                    )
                    }
                })
                
            });
            cardDiv.appendChild(nombreSpan);
            cardDiv.appendChild(turnoP);
            cardDiv.appendChild(eliminarButton);
            datosDiv.appendChild(cardDiv);
        });
    }
    // Mostrar los datos iniciales al cargar la página
    mostrarDatos(personas);
});