/**
 * Muestra u oculta los detalles de la tarjeta según el método de pago seleccionado.
 * @method mostrarDetallesTarjeta
 * @param {string} metodoPago - El método de pago seleccionado.
 * @param {HTMLElement} detallesTarjeta - El elemento HTML que contiene los detalles de la tarjeta.
 * @return {void} No retorna ningún valor.
 */
function mostrarDetallesTarjeta() {
    var metodoPago = document.getElementById("metodoPago").value;
    var detallesTarjeta = document.getElementById("detallesTarjeta");

    if (metodoPago === "efectivo") {
        detallesTarjeta.style.display = "none";
    } else {
        detallesTarjeta.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const nombreZapatilla = urlParams.get("name");
    const precioZapatilla = urlParams.get("price");

    // Rellenar campos del formulario
    document.getElementById("nombre").value = nombreZapatilla;
    document.getElementById("precio").value = precioZapatilla;

    // Calcular el total cuando cambie la cantidad y el servicio
    const cantidadInput = document.getElementById("cantidad");
    const servicioSelect = document.getElementById("servicio");
    const totalInput = document.getElementById("total");
    const totalText = document.getElementById("totalText");

    cantidadInput.addEventListener("input", calcularTotal);
    servicioSelect.addEventListener("change", calcularTotal);

    /**
     * Calcula el total a pagar en función de la cantidad, precio de la zapatilla y el servicio seleccionado.
     * @return {void} No retorna ningún valor.
     */
    function calcularTotal() {
        const cantidad = parseInt(cantidadInput.value);
        const precio = parseInt(precioZapatilla);
        const servicio = parseInt(servicioSelect.value);
        const total = cantidad * precio + servicio;
        totalInput.value = "$" + total;
    }

    // Mostrar el total a pagar en un texto después de enviar el formulario
    const form = document.getElementById("purchase-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const cantidad = parseInt(cantidadInput.value);
        const precio = parseInt(precioZapatilla);
        const servicio = parseInt(servicioSelect.value);
        const total = cantidad * precio + servicio;
        totalText.textContent = "Total a pagar: $" + total;
        totalText.style.display = "block";
    });
});

function validarFormulario() {
    var nombreCliente = document.getElementById("nombreCliente").value;
    var email = document.getElementById("email").value;
    var cp = document.getElementById("cp").value;
    var ciudad = document.getElementById("ciudad").value;
    var direccion = document.getElementById("direccion").value;
    var numeroTarjeta = document.getElementById("numeroTarjeta").value;
    var vencimientoTarjeta = document.getElementById("vencimientoTarjeta").value;
    var titularTarjeta = document.getElementById("titularTarjeta").value;
    var direccionFacturacion = document.getElementById("direccionFacturacion").value;
    var codigoSeguridad = document.getElementById("codigoSeguridad").value;

    if (
        nombreCliente === "" ||
        email === "" ||
        cp === "" ||
        ciudad === "" ||
        direccion === "" ||
        numeroTarjeta === "" ||
        vencimientoTarjeta === "" ||
        titularTarjeta === "" ||
        direccionFacturacion === "" ||
        codigoSeguridad === ""
    ) {
        alert("Por favor, complete todos los campos antes de realizar la compra.");
        return false;
    }

    return true;
}