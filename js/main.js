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
        mensaje2.appendChild(boton);
    } else {
        mensaje1.innerHTML = '';
        mensaje1.innerHTML="<strong>Debes ingresar tanto el usuario como el apellido.</strong>"
    }
});



