let formu=document.getElementById("form")
let mensaje1=document.getElementById("mensaje1")
formu.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    if (nombre && apellido) {
        sessionStorage.setItem("nombreUsuario", nombre);
        sessionStorage.setItem("apellidoUsuario", apellido);
        mensaje1.innerHTML = `Hola usuario ${nombre} `;
        let boton = document.createElement('button');
        boton.className=`botoncreado`
        let enlace = document.createElement('a');
        enlace.href = 'pages/principal.html';
        enlace.innerText = 'Ir a otra página';
        boton.appendChild(enlace);
        let mensaje2 = document.getElementById('mensaje2');
        mensaje2.innerHTML = '';
        Toastify({
            text: "Inicio secion con exito",
            className: "info",
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
        mensaje2.appendChild(boton);
    } else {
        mensaje1.innerHTML = '';
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes de completar todo',
            footer: 'Disculpe la molestia</p>'
        })
        mensaje1.innerHTML="<strong>Debes ingresar tanto el usuario como el apellido.</strong>"
    }
});