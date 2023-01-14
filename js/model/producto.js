class Producto {
    nombre;
    cantidad;
    precio;
    marca;
    cantidadVendida;

    //Constructor
    constructor(nombre, cantidad, precio, marca)
    {
        this.nombre = nombre
        this.cantidad = cantidad
        this.precio = parseFloat(precio)
        this.marca = marca
        this.cantidadVendida = 0
    }

    //metodos
    vender() 
    {
        this.cantidadVendida = this.cantidadVendida + 1
        this.cantidad = this.cantidad - 1
    }

    sumarElIva()
    {
        this.precio = this.precio*1.21
    }

    actualizarStock(nuevoStock)
    {
        this.cantidad = this.cantidad + nuevoStock
    }

    calcularDescuento()
    {
        let descu = parseInt(prompt("Ingrese el porcentaje del descuento en numero"))
        return this.precio*descu/100
    }

    calcularDisponibilidad(cantidad){
        return this.cantidad-cantidad >= 0
    }
}