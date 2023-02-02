const btnAgregarCant = document.querySelectorAll('.buttonAdd')
const btnSacarCant = document.querySelectorAll('.buttonSubtract')
const btnSacarCant1 = document.getElementById('buttonSubtract')
const cant = document.getElementsByClassName('cant')
const agregar = document.getElementsByClassName('noselect')
const cards = document.getElementsByClassName('cards')

const productos = []
const carrito = []

window.addEventListener('DOMContentLoaded', getAllProducts)

function getAllProducts() {
    let id = 0
    for (const card of cards) {
        let nombre = card.querySelector('h3').textContent
        let precio = card.querySelectorAll('p')[0].textContent.substring(1,)
        let litros = card.querySelectorAll('p')[1].textContent
        card.querySelector('.noselect').dataset.id = id
        console.log(card)
        productos.push(new Producto(id, nombre, precio, litros))
        id++
    }
    console.log(productos)
}

for (const card of cards) {
    console.log(card)
    console.log(card.querySelector('h3').textContent)
}

for (const boton of agregar) {
    boton.addEventListener('click', (e) => {
        setCarrito(e)
        console.log(boton.parentNode.parentNode)
    })
    /* console.log(card.querySelector('h3').textContent) */
}

function setCarrito(e) {
    let id = e.target.parentElement.dataset.id
    let cant = e.target.parentElement.parentElement.querySelector('p').textContent
    const prod = productos.find((producto) => { return producto.id === parseInt(id) })
    carrito.push(new Item(prod, cant))
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(e.target.parentElement.dataset.id)
    console.log(e.target.parentElement.parentElement.querySelector('p').textContent)
    agregarTabla()
}

function agregarTabla() {
    const tbody = document.getElementById('items')
    const trTotal = document.getElementById('trTotal');
    tbody.innerHTML = ''; ///limpio la tabla
    trTotal.innerHTML = '';
    let counter = 1;
    carrito.forEach((item) => {
        tbody.innerHTML +=
            `
                <tr>
                 <th scope="row">${counter}</th>
                 <td> ${item.producto.nombre} </td>
                 <td> ${item.producto.precio} </td>
                 <td> ${item.producto.litros} </td>
                 <td> ${item.cantidad} </td>
                </tr>`;

        counter++;
    });

    let th = document.createElement('th');
    th.innerText = 'Total:'
    trTotal.appendChild(th)

    th = document.createElement('th');
    th.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.producto.precio*producto.cantidad, 0);
    trTotal.appendChild(th);
}

for (const botones of btnAgregarCant) {
    botones.addEventListener('click', () => {
        console.log(botones.parentNode.querySelector('p'))
        botones.parentNode.querySelector('p').textContent = parseInt(botones.parentNode.querySelector('p').textContent) + 1
        console.log(botones.parentNode.querySelector('#buttonSubtract'))
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


/* btnAgregarCant1.addEventListener('click', () => {
    cant.textContent = parseInt(cant.innerText) + 1
    btnSacarCant.disabled = false
}); */

/* btnSacarCant.addEventListener('click', () => {
    cant.textContent = parseInt(cant.textContent) - 1
    if( cant.textContent === '1') btnSacarCant.disabled = true
}); */

/* agregar.addEventListener('click', e => {
    console.log(e.target.parentElement)
}) */

function menuPrincipal() {

    let opcion
    let totCuenta = 0
    let totalTodas = 0
    let contCompra = 0
    let acumuladorDesc = 0
    let totAPagar = 0
    const productos = []
    const carrito = []

    alert("Bienvenido al almacen Lorenzo")

    do {
        opcion = parseInt(prompt("Ingrese una opcion:\n 1-Realizar una compra\n 2-Cerrar una cuenta\n 3-Ver estadistias\n 4-Cargar un producto\n 5-Salir"))

        switch (opcion) {
            case 1:
                let anterior = carrito.length
                comprarProducto(productos, carrito)
                if (carrito.length != anterior) {
                    contCompra = contCompra + 1
                }
                break

            case 2:
                totCuenta = carrito.reduce((acumulador, producto) => { return acumulador + producto.precio }, 0)
                totAPagar = totCuenta * descuento(totCuenta, carrito)
                alert("El descuento que se le hizo es de: " + (totCuenta - totAPagar))
                alert("El total a pagar es: " + totAPagar + ". La cuenta se cerro")
                acumuladorDesc = acumuladorDesc + (totCuenta - totAPagar)
                totalTodas = totalTodas + totAPagar
                totCuenta = 0
                vaciarCarrito(carrito)
                break

            case 3:
                estadisticas(totalTodas, contCompra, acumuladorDesc)
                break

            case 4:
                cargarProducto(productos)
                break

            case 5:
                alert("Saliendo...")
                break

            default:
                alert("Opcion incorrecta")
        }

    } while (opcion != 5)
    console.log(productos)
}

function cargarProducto(productos) {
    let producto
    let seguir

    do {
        producto = cargandoProducto()
        productos.push(producto)
        seguir = prompt("Desea seguir cargando productos? si/no").toUpperCase()
    } while (seguir == "SI")

    if (seguir != "NO") {
        alert("Dato incorrecto vuelve al menu principal")
    }
}


function cargandoProducto() {
    const producto = new Producto()
    producto.nombre = prompt("Ingrese el nombre del producto")
    producto.cantidad = parseInt(prompt("Ingrese la cantidad en stock"))
    producto.precio = parseFloat(prompt("Ingrese el precio del producto"))
    producto.marca = prompt("Ingrese la marca del producto")
    producto.sumarElIva()
    return producto
}

function comprarProducto(productos, carrito) {

    let opcion = parseInt(prompt("Ingrese 1 si desea ver el listado de productos\nIngrese 2 si desea ingresar el nombre del producto que desean comprar"))

    switch (opcion) {
        case 1:
            verListado(productos)
            realizarCompra(productos, carrito)
            break;

        case 2:
            realizarCompra(productos, carrito)
            break;

        default:
            alert("La opcion ingresada no existe. Vuelve al menu principal")
    }

}

function realizarCompra(productos, carrito) {

    let nombre

    nombre = prompt("Ingrese el nombre del producto que desean comprar")
    let productoEncontrado = productos.find((producto) => { return producto.nombre == nombre })
    if (productoEncontrado != undefined) {
        let cantidadStock = parseInt(prompt("Ingrese la cantidad que desean comprar"))
        if (productoEncontrado.calcularDisponibilidad(cantidadStock) && cantidadStock > 0) {
            productoEncontrado.vender(cantidadStock)
            for (let i = 0; i < cantidadStock; i++) {
                carrito.push(productoEncontrado)
            }
        }
        else {
            alert("No se puede realizar la compra debido a que no se dispone del stock")
        }
    }
    else {
        alert("No se encontro ningun producto con ese nombre")
    }
}

function verListado(productos) {

    let cont = 0
    productos.forEach(producto => {
        cont++
        console.log("Producto " + cont)
        mostrarProducto(producto)
    });
    alert("Se imprimio el listado por consola")
}

function mostrarProducto(producto) {
    console.log("nombre: " + producto.nombre)
    console.log("Precio: " + producto.precio)
    console.log("Marca: " + producto.marca)
}

function vaciarCarrito(carrito) {
    carrito.splice(0, carrito.length)
}

function descuento(total, carrito) {

    let productoAnterior = " "
    let contador = 0

    carrito.sort((producto1, producto2) => {
        if (producto1.nombre < producto2.nombre) {
            return -1;
        }
        else {
            if (producto1.nombre > producto2.nombre) {
                return 1
            }
            else {
                return 0
            }
        }
    })

    carrito.forEach((producto) => {
        if (productoAnterior != producto) {
            contador++
        }
        productoAnterior = producto
    })

    if (total > 1000 && contador >= 3) {
        alert("Por superar los $1000 y comprar 3 o mas productos distintos le corresponde un descuento del 20%")
        return 0.80
    }
    else {
        if (total > 1000 || contador >= 3) {
            if (total > 1000) {
                alert("Por superar los $1000 corresponde un descuento del 10%")
            }
            else {
                alert("Por la compra de 3 o mas productos distintos corresponde un descuento del 10%")
            }
            return 0.9
        }
        else {
            alert("No corresponde ningun descuento")
            return 1
        }
    }
}

function estadisticas(tot, contadorCompras, acumuDescuentos) {
    op = parseInt(prompt("Ingrese una opcion segun la estadistica que quiera ver\n 1-Total de todas las cuentas\n 2-Promedio gastado por compra\n 3-Cantidad de compras\n 4-Cantidad de dinero que no se recaudo por los descuentos\n 5-Promedio de la cantidad de dinero perdido por descuentos por compra"))
    switch (op) {
        case 1:
            alert("El total de todas las cuentas es: " + tot)
            break

        case 2:
            alert("El promedio gastado por compra es: " + tot / contadorCompras)
            break

        case 3:
            alert("La cantidad de compras es: " + contadorCompras)
            break

        case 4:
            alert("La cantidad de dinero que no se recaudo por los descuentos es: " + acumuDescuentos)
            break

        case 5:
            alert("La cantidad de dinero perdido en promedio por cada compra debido a los descuentos es: " + acumuDescuentos / contadorCompras)
            break;

        default:
            alert("Opcion incorrecta")
    }
}

//menuPrincipal()