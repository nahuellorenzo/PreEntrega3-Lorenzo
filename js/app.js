const cards = document.getElementsByClassName('cards')
const tbody = document.getElementById('items')
const trTotal = document.getElementById('trTotal');
const btnVaciar = document.getElementById("vaciar")
const body = document.getElementById("body")
const prodsSection = document.getElementById("products") 
const input = document.getElementById("inputSearch")

let productos = []
let carrito = []

window.addEventListener('DOMContentLoaded', getAllProductsGetCarritoJson)

function getAllProductsGetCarritoJson(){
    fetch("./js/productos.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(prodsSection)
        prodsSection.innerHTML = ''
        data.forEach( (data) => {
            console.log(data.nombre)
            prodsSection.innerHTML +=
                                        `
                                        <article class="col-md-4 col-lg-3">
                                        <div class="cards">
                                            <div class="img">
                                                <img src="${data.img}" alt="">
                                            </div>
                                            <h3 class="fuente text-center">${data.nombre}</h3>
                                            <p class="fuente">$${data.precio}</p>
                                            <p class="fuente">${data.litros}</p>
                                            <div class="add">
                                                <div class="cantidad">
                                                    <button class="button-container buttonSubtract" id="buttonSubtract" disabled>
                                                        <i class="bi bi-dash-circle"></i>
                                                    </button>
                                                    <p class="cant" id="cantidad${data.id}">1</p>
                                                    <button class="button-container buttonAdd" id="buttonAdd">
                                                        <i class="bi bi-plus-circle"></i>
                                                    </button>
                                                </div>
                                                <button class="noselect" id="noselect${data.id}">
                                                    <span class="text">Agregar</span>
                                                    <span class="icon">
                                                        <i class="bi bi-cart-fill"></i>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                        `
        });
        getAllProductsGetCarrito()
    })
}

function getAllProductsGetCarrito() {
    getAllProducts()
    getCarrito()
    botonAgregarFuncionalidad()
}

function getAllProducts() {
    let id = 0
    for (const card of cards) {
        let nombre = card.querySelector('h3').textContent
        let precio = card.querySelectorAll('p')[0].textContent.substring(1,)
        let litros = card.querySelectorAll('p')[1].textContent
        let img = card.querySelector('img').src
        card.querySelector('.noselect').dataset.id = id
        productos.push(new Producto(id, nombre, precio, litros,img))
        id++
    }
    console.log(productos)
}

function getCarrito() {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    if (carrito === null) {
        carrito = []
    }
    agregarTabla()
}

function botonAgregarFuncionalidad(){

    const btnAgregarCant = document.querySelectorAll('.buttonAdd')
    const btnSacarCant = document.querySelectorAll('.buttonSubtract')
    const agregar = document.getElementsByClassName('noselect')

    for (const boton of agregar) {
        boton.addEventListener('click', (e) => {
            let elemEncontrado
            let cant

            elemEncontrado = encontrarElemento(e,"i","span")
            cant = elemEncontrado.parentElement.querySelector('p').textContent
            setCarrito(elemEncontrado)

            productoAgregado = productos.find((producto) => { return producto.id === parseInt(elemEncontrado.dataset.id) })

            Toastify({
                text: `Se agregó ${cant} ${productoAgregado.nombre} al carrito`,
                duration: 100000,
                newWindow: true,
                className: "adver",
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
            }).showToast();
        })
    }

    for (const botones of btnAgregarCant) {
        botones.addEventListener('click', () => {
            botones.parentNode.querySelector('p').textContent = parseInt(botones.parentNode.querySelector('p').textContent) + 1
            botones.parentNode.querySelector('#buttonSubtract').disabled = false
        });
    }

    for (const botones of btnSacarCant) {
        botones.addEventListener('click', () => {
            console.log(botones.parentNode.querySelector('p'))
            botones.parentNode.querySelector('p').textContent = parseInt(botones.parentNode.querySelector('p').textContent) - 1
            if (botones.parentNode.querySelector('p').textContent === '1') botones.disabled = true
        });
    }

}

function setCarrito(e) {
    console.log(e)
    let id = e.dataset.id
    let cant = e.parentElement.querySelector('p').textContent

    const prod = productos.find((producto) => { return producto.id === parseInt(id) })
    const item = carrito.find((item) => { return item.producto.id === prod.id })
    if (item === undefined) {
        carrito.push(new Item(prod, cant))
    }
    else {
        item.cantidad = item.cantidad + parseInt(cant)
    }
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    agregarTabla()
}

function agregarTabla() {
    tbody.innerHTML = ''; ///limpio la tabla
    trTotal.innerHTML = '';
    let cont = 1;
    carrito.forEach((item) => {
        tbody.innerHTML +=
            `
                <tr class="filasItem">
                    <th class="celdas text-center" scope="row">${cont}</th>
                    <td class="celdas text-center"> ${item.producto.nombre} </td>
                    <td class="celdas text-center"> ${item.producto.precio} </td>
                    <td class="celdas text-center"> ${item.cantidad} </td>
                    <td class="celdas elim text-center">
                        <button class="btn btn-danger trash" id="boton${item.producto.id}" data-id="${item.producto.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg></button>
                </tr>`;
        cont++;
    });

    const buttones = document.getElementsByClassName("trash")

    for (const button of buttones) {
        button.addEventListener('click', (e) => {
            elem = encontrarElemento(e,"path","svg")
            id = elem.dataset.id
            console.log(id)
            let num = carrito.indexOf(carrito.find((producto) => { return producto.producto.id === parseInt(id) }))
            console.log(num)
            carrito.splice(num, 1)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            agregarTabla()
        })
    }

    let th = document.createElement('th');
    th.innerText = 'Total:'
    trTotal.appendChild(th)

    th = document.createElement('th');
    th.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.producto.precio * producto.cantidad, 0);
    trTotal.appendChild(th);
}

btnVaciar.addEventListener('click', (e) => {
    e.preventDefault()
    carrito.splice(0,)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    agregarTabla()
})

function encontrarElemento(e,elemento1,elemento2) {
    if (e.target.localName === elemento1){
        console.log(e)
        return e.target.parentElement.parentElement
    } 
    else if (e.target.localName === elemento2){
        console.log(e)
        return e.target.parentElement
    } 
    else{
        console.log(e) 
        return e.target}
}

body.addEventListener('dblclick', (e) => {
    e.preventDefault()
})

input.addEventListener('keyup', (e) => {
    const filtroBusqueda = productos.filter((producto) => {
        return producto.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    })
    prodsSection.innerHTML = ''
    filtroBusqueda.forEach( (data) => {
        console.log(data.nombre)
        prodsSection.innerHTML +=
                                    `
                                    <article class="col-md-4 col-lg-3">
                                    <div class="cards">
                                        <div class="img">
                                            <img src="${data.img}" alt="">
                                        </div>
                                        <h3 class="fuente text-center">${data.nombre}</h3>
                                        <p class="fuente">$${data.precio}</p>
                                        <p class="fuente">${data.litros}</p>
                                        <div class="add">
                                            <div class="cantidad">
                                                <button class="button-container buttonSubtract" id="buttonSubtract" disabled>
                                                    <i class="bi bi-dash-circle"></i>
                                                </button>
                                                <p class="cant" id="cantidad${data.id}">1</p>
                                                <button class="button-container buttonAdd" id="buttonAdd">
                                                    <i class="bi bi-plus-circle"></i>
                                                </button>
                                            </div>
                                            <button class="noselect" id="noselect${data.id}">
                                                <span class="text">Agregar</span>
                                                <span class="icon">
                                                    <i class="bi bi-cart-fill"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                                    `
    })
    botonAgregarFuncionalidad()
})