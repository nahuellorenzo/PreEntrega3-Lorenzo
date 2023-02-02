class Producto {
    id;
    nombre;
    precio;
    litros;

    //Constructor
    constructor(id, nombre, precio, litros)
    {
        this.id = id
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.litros = litros
    }

    //metodos
    vender(cant) 
    {
        this.cantidadVendida = this.cantidadVendida + cant
        this.cantidad = this.cantidad - cant
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

    calcularDisponibilidad(cantidadPedida){
        return this.cantidad-cantidadPedida >= 0
    }
}