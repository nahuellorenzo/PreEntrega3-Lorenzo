function menuPrincipal(){

    let opcion
    let totCompra = 0
    let totalTodas = 0
    let contCompra = 0
    let cantProductos = 0
    let acumuladorDesc = 0

    alert("Bienvenido al almacen Lorenzo")

    do {
        opcion = parseInt(prompt("Ingrese una opcion:\n 1-Realizar una compra\n 2-Cerrar una compra\n 3-Ver estadistias\n 4-Salir"))
        
        switch (opcion) {
            case 1:
                totCompra = totCompra + comprarProducto()
                if (totCompra != 0){
                    contCompra = contCompra + 1
                    cantProductos = cantProductos + 1
                }
                break

            case 2:
                let totAPagar = totCompra * descuento(totCompra,cantProductos)
                alert("El total a pagar es: " + totAPagar)
                acumuladorDesc = acumuladorDesc + (totCompra - totAPagar)
                totalTodas = totalTodas + totAPagar
                totCompra = 0
                cantProductos = 0
                break

            case 3:
                estadisticas(totalTodas, contCompra, acumuladorDesc)
                break

            case 4:
                alert("Saliendo...")
                break

            default:
                alert("Opcion incorrecta")
        }

    } while(opcion!=4)
}

function comprarProducto(){

    let producto
    let total = 0

    producto = parseInt(prompt("Ingrese una opcion segun el producto que desee:\n 1-Gaseosa\n 2-Fideos\n 3-Galletitas\n 4-Tomate\n 5-Lavandina\n 6-Dentifrico"))
    switch (producto) {
        case 1:
            total=totalProducto(180)
            break
        case 2:
            total=totalProducto(100)
            break
        case 3:
            total=totalProducto(120)
            break
        case 4:
            total=totalProducto(200)
            break
        case 5:
            total=totalProducto(150)
            break
        case 6:
            total=totalProducto(170)
            break
        default:
            alert("Opcion incorrecta")
    }

    return total
}

function totalProducto(precio){
    let cant = 0
    cant = parseInt(prompt("Ingrese la cantidad que desea comprar:"))
    return precio*cant
}

function descuento(total,productos){
    if (total > 1000 && productos >= 3){
        alert("Por superar los $1000 y comprar 3 o mas productos distintos le corresponde un descuento del 20%")
        return 0.80
    }
    else{
        if (total > 1000 || productos >= 3){
            if(total > 1000){
                alert("Por superar los $1000 le corresponde un descuento del 10%")
            }
            else{
                alert("Por comprar 3 o mas productos le corresponde un descuento del 10%")
            }
            return 0.9
        }
        else{
            alert("No le corresponde ningun descuento")
            return 1
        }
    }
}

function estadisticas(tot, contadorCompras, acumuDescuentos){
    op = parseInt(prompt("Ingrese una opcion segun la estadistica que quiera ver\n 1-Total de todas las compras\n 2-Promedio gastado por compra\n 3- Cantidad de compras\n 4-Cantidad de dinero que no se recaudo por los descuentos"))
    switch (op) {
        case 1:
            alert("El total de todas las compras es: " + tot)
            break

        case 2:
            alert("El promedio gastado por compra es: " + tot/contadorCompras)
            break

        case 3:
            alert("La cantidad de compras es: " + contadorCompras)
            break

        case 4:
            alert("La cantidad de dinero que no se recaudo por los descuentos es: " + acumuDescuentos)
            break

        default:
            alert("Opcion incorrecta")
    }
}

menuPrincipal()