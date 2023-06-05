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


