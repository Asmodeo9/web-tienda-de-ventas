// Botón de cargar más elementos
let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < Math.min(currentItem + 4, boxes.length); i++) {
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar eventos
cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Función para comprar un elemento
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

// Leer datos del elemento seleccionado
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,  // Corregido el selector de 'precio'
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

// Insertar elemento en el carrito
function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width="100" height="150px">
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a> <!-- Corregido el typo de 'herf' a 'href' -->
    </td>
    `;
    lista.appendChild(row);
}

// Eliminar elemento del carrito
function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        const elemento = e.target.parentElement.parentElement;
        const elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

// Vaciar el carrito
function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}