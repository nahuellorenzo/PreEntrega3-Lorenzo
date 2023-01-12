function menuPrincipal(){

    let opcion
    let totCuenta = 0
    let compra = 0
    let totalTodas = 0
    let contCompra = 0
    let cantUsoFuncion = 0
    let acumuladorDesc = 0
    let totAPagar = 0

    alert("Bienvenido al almacen Nahuel Lorenzo")
    alert("Bienvenudo al almacen")
    

    do {
        opcion = parseInt(prompt("Ingrese una opcion:\n 1-Realizar una compra\n 2-Cerrar una cuenta\n 3-Ver estadistias\n 4-Salir"))
        
        switch (opcion) {
            case 1:
                compra = comprarProducto()
                if (compra != 0){
                    totCuenta = totCuenta + compra
                    contCompra = contCompra + 1
                    cantUsoFuncion = cantUsoFuncion + 1
                }
                break

            case 2:
                totAPagar = totCuenta * descuento(totCuenta,cantUsoFuncion)
                alert("El descuento que se le hizo es de: " + (totCuenta - totAPagar))
                alert("El total a pagar es: " + totAPagar + ". La cuenta se cerro")
                acumuladorDesc = acumuladorDesc + (totCuenta - totAPagar)
                totalTodas = totalTodas + totAPagar
                totCuenta = 0
                cantUsoFuncion = 0
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
    if (cant > 0){
        return precio*cant
    }
    else{
        alert("La cantidad ingresada es incorrecta. Vuelva a intentarlo")
        return 0
    }
}

function descuento(total,productos){
    if (total > 1000 && productos >= 3){
        alert("Por superar los $1000 y utilizar la funcion realizar una compra 3 o mas veces le corresponde un descuento del 20%")
        return 0.80
    }
    else{
        if (total > 1000 || productos >= 3){
            if(total > 1000){
                alert("Por superar los $1000 le corresponde un descuento del 10%")
            }
            else{
                alert("Por utilizar la funcion realizar una compra 3 o mas veces le corresponde un descuento del 10%")
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
    op = parseInt(prompt("Ingrese una opcion segun la estadistica que quiera ver\n 1-Total de todas las cuentas\n 2-Promedio gastado por compra\n 3-Cantidad de compras\n 4-Cantidad de dinero que no se recaudo por los descuentos\n 5-Promedio de la cantidad de dinero perdido por descuentos por compra"))
    switch (op) {
        case 1:
            alert("El total de todas las cuentas es: " + tot)
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

        case 5:
            alert("La cantidad de dinero perdido en promedio por cada compra debido a los descuentos es: " + acumuDescuentos/contadorCompras)
            break;

        default:
            alert("Opcion incorrecta")
    }
}

menuPrincipal()