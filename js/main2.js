//pagina2 grande
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var objeto = {
    nombre: nombre,
    apellido: apellido,
    };
    var arrayObjetos = [];
    arrayObjetos.push(objeto);
    console.log(arrayObjetos);
});
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var objeto = {
        nombre: nombre,
        apellido: apellido
    };
    var arrayObjetos = JSON.parse(localStorage.getItem('arrayObjetos')) || [];
    arrayObjetos.push(objeto);
    localStorage.setItem('arrayObjetos', JSON.stringify(arrayObjetos));
    mostrarNombres(arrayObjetos);
    mostrarApellidos(arrayObjetos);
});
function mostrarNombres(arrayObjetos) {
    var nombres = arrayObjetos.map(function(obj) {
        return obj.nombre;
    });
    document.getElementById('nombrescli').innerHTML = '<ol><li>' + nombres.join('</li><li>') + '</li></ol>';
}
function mostrarApellidos(arrayObjetos) {
    var apellidos = arrayObjetos.map(function(obj) {
        return obj.apellido;
    });
    document.getElementById('apellidoscli').innerHTML = '<ol><li>' + apellidos.join('</li><li>') + '</li></ol>';
}
document.addEventListener('DOMContentLoaded', function() {
    var arrayObjetos = JSON.parse(localStorage.getItem('arrayObjetos')) || [];
    mostrarNombres(arrayObjetos);
    mostrarApellidos(arrayObjetos);
});
document.getElementById('eliminarDatos').addEventListener('click', function() {
    localStorage.removeItem('arrayObjetos');
    document.getElementById('nombrescli').innerHTML = '';
    document.getElementById('apellidoscli').innerHTML = '';
});
let saludar=sessionStorage.getItem(`nombreUsuario`)
let dentrosaludar=document.getElementById("Saludar")

dentrosaludar.innerHTML=`<h1>Hola usuario ${saludar}</h1>`

let contenedorEliminartodo = document.getElementById("busquedaa")

let inputBusqueda = document.createElement('input');
inputBusqueda.setAttribute('type', 'text');
inputBusqueda.setAttribute('id', 'busqueda');
inputBusqueda.setAttribute('placeholder', 'Buscar por apellido');
contenedorEliminartodo.appendChild(inputBusqueda);

let botonBuscar = document.createElement('button');
botonBuscar.setAttribute('id', 'buscar');
botonBuscar.innerText = 'Buscar';
botonBuscar.className=`nada`
contenedorEliminartodo.appendChild(botonBuscar);
document.getElementById('buscar').addEventListener('click', function() {
    let apellidoBuscado = document.getElementById('busqueda').value;
    mostrarApellido(apellidoBuscado);
});

function mostrarApellido(apellido) {
    let arrayObjetos = JSON.parse(localStorage.getItem('arrayObjetos')) || [];
    let indice = -1;
    for (let i = 0; i < arrayObjetos.length; i++) {
        if (arrayObjetos[i].apellido === apellido) {
            indice = i;
            break;
        }
    }
    if (indice !== -1) {
        let apellidoEncontrado = arrayObjetos[indice].apellido;

        var elementoApellido = document.createElement('p');
        elementoApellido.innerText = apellidoEncontrado;
        
        let botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'Eliminar';
        botonEliminar.className=`nada`
        botonEliminar.addEventListener('click', function() {
            arrayObjetos.splice(indice, 1);
            localStorage.setItem('arrayObjetos', JSON.stringify(arrayObjetos));
            mostrarNombres(arrayObjetos);
            mostrarApellidos(arrayObjetos);
            contenedorEliminartodo.removeChild(elementoApellido);
            contenedorEliminartodo.removeChild(botonEliminar);
        });
        contenedorEliminartodo.appendChild(elementoApellido);
        contenedorEliminartodo.appendChild(botonEliminar);
    } else {
        let noseencontro=document.getElementById("nada")
        noseencontro.innerHTML=`<h3>No se encontro ningun apellido</h3>`
    }
}










