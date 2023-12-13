/**
 * Muestra u oculta los detalles de la tarjeta según el método de pago seleccionado.
 * @method mostrarDetallesTarjeta
 * @param {string} metodoPago - El método de pago seleccionado.
 * @param {HTMLElement} detallesTarjeta - El elemento HTML que contiene los detalles de la tarjeta.
 */
function mostrarDetallesTarjeta() {
    const metodoPago = document.getElementById("metodoPago").value;
    const detallesTarjeta = document.getElementById("detallesTarjeta");

    if (metodoPago === "efectivo") {
        detallesTarjeta.style.display = "none";
    } else if (metodoPago === "null") {
        detallesTarjeta.style.display = "none";
    } else {
        detallesTarjeta.style.display = "block";
    }
}

/**
 * Evento que se activa cuando el contenido del DOM (Document Object Model) ha sido completamente cargado.
 * Obtiene los parámetros "name" y "price" de la URL y rellena los campos del formulario con dichos valores.
 * Agrega eventos para calcular el total cuando cambie la cantidad y el servicio seleccionado.
 * También agrega un evento para manejar el envío del formulario y mostrar un mensaje de agradecimiento.
 * @method handleDOMContentLoaded
 * @return {void} No retorna ningún valor.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const nombreZapatilla = urlParams.get("name");
    const precioZapatilla = urlParams.get("price");

    // Rellenar campos del formulario
    document.getElementById("nombre").value = nombreZapatilla;
    document.getElementById("precio").value = precioZapatilla;

    // Obtener elementos HTML para cálculo del total
    const cantidadInput = document.getElementById("cantidad");
    const servicioSelect = document.getElementById("servicio");
    const totalInput = document.getElementById("total");
    const totalText = document.getElementById("totalText");

    // Agregar eventos para calcular el total cuando cambie la cantidad y el servicio seleccionado
    cantidadInput.addEventListener("input", calcularTotal);
    servicioSelect.addEventListener("change", calcularTotal);

    /**
     Función para calcular el total a pagar en función de la cantidad, precio de la zapatilla y el servicio seleccionado.
     @method calcularTotal
     @return {void} No retorna ningún valor.
     */
    function calcularTotal() {
        //parseInt() se utiliza para convertir el valor contenido en el elemento cantidadInput en un número entero
        const cantidad = parseInt(cantidadInput.value);
        const precio = parseInt(precioZapatilla);
        const servicio = parseInt(servicioSelect.value);
        const total = cantidad * precio + servicio;
        totalInput.value = "$" + total;
    }

    //Aquí, se selecciona el formulario mediante su ID "purchase-form" y se almacena en la variable form.
    const form = document.getElementById("purchase-form");
    //Cuando el formulario es enviado, la función que se proporciona como segundo argumento se ejecutará.
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Mostrar el mensaje de agradecimiento después de enviar el formulario
        const mensajeGracias = document.getElementById("mensajeGracias");

        // Redireccionar al catálogo de zapatillas después de 5 segundos
        setTimeout(function () {
            window.location.href = "./main.html"; // Ruta a la página del catálogo de zapatillas
        }, 5000); // 5000 milisegundos = 5 segundos
    });
});

/**
 * Función que valida los campos del formulario antes de realizar una compra.
 * Verifica que el campo "Email" tenga una dirección de correo electrónico válida según la expresión regular corregida.
 * También valida que los campos obligatorios no estén vacíos y que aquellos campos numéricos contengan solo números.
 * Si algún campo no cumple con las validaciones, muestra una alerta indicando el error y blanquea el campo "Email" si es inválido.
 * Si todos los campos obligatorios están completos y son válidos, muestra un mensaje de agradecimiento por la compra y redirecciona al catálogo de zapatillas después de 5 segundos.
 * @method validarFormulario
 * @param {void} No recibe ningún parámetro explícito.
 * @return {boolean} Retorna true si todos los campos son válidos y se puede realizar la compra, de lo contrario, retorna false.
 */
function validarFormulario() {
    var nombreCliente = document.getElementById("nombreCliente");
    var email = document.getElementById("email");
    var cp = document.getElementById("cp");
    var ciudad = document.getElementById("ciudad");
    var direccion = document.getElementById("direccion");
    var numeroTarjeta = document.getElementById("numeroTarjeta");
    var vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
    var titularTarjeta = document.getElementById("titularTarjeta");
    var direccionFacturacion = document.getElementById("direccionFacturacion");
    var codigoSeguridad = document.getElementById("codigoSeguridad");

    /**
     * Validar el campo "Email" con una expresión regular corregida.
     * @method validateEmail
     * @return {boolean} Devuelve `false` si la dirección de correo electrónico es inválida, de lo contrario, devuelve `true`.
     */
    var email = document.getElementById("email").value;
    //expresión regular (emailRegex) que valida las direcciones de correo electrónico permitidas. Solo se aceptan direcciones de correo con dominios "outlook.com", "gmail.com", "hotmail.com" o "yahoo.com".
    var emailRegex = /^[a-zA-Z0-9._%+-]+@(outlook\.com|gmail\.com|hotmail\.com|yahoo\.com)$/i;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        //Se blanquea el campo de correo electrónico para borrar el valor incorrecto ingresado por el usuario.
        // return false;: Se retorna false para evitar que el formulario se envíe
        // en caso de que se haya ingresado un correo electrónico no válido
        document.getElementById("email").value = ""; // Blanquear el campo "Email"
        return false;
    }

    const numerosRegex = /^[0-9]+$/;

    if (nombreCliente.value === "") {
        nombreCliente.value = "";
    }

    if (email.value === "") {
        email.value = "";
    }

    if (cp.value === "" || !numerosRegex.test(cp.value)) {
        cp.value = "";
    }

    if (ciudad.value === "") {
        ciudad.value = "";
    }

    if (direccion.value === "") {
        direccion.value = "";
    }

    if (numeroTarjeta.value === "" || !numerosRegex.test(numeroTarjeta.value)) {
        numeroTarjeta.value = "";
    }

    if (vencimientoTarjeta.value === "" || !numerosRegex.test(vencimientoTarjeta.value)) {
        vencimientoTarjeta.value = "";
    }

    if (titularTarjeta.value === "") {
        titularTarjeta.value = "";
    }

    if (direccionFacturacion.value === "") {
        direccionFacturacion.value = "";
    }

    if (codigoSeguridad.value === "" || !numerosRegex.test(codigoSeguridad.value)) {
        codigoSeguridad.value = "";
    }

    if (
        nombreCliente.value === "" ||
        email.value === "" ||
        cp.value === "" ||
        ciudad.value === "" ||
        direccion.value === "" ||
        numeroTarjeta.value === "" ||
        vencimientoTarjeta.value === "" ||
        titularTarjeta.value === "" ||
        direccionFacturacion.value === "" ||
        codigoSeguridad.value === ""
    ) {
        alert("Por favor, complete todos los campos correctamente antes de realizar la compra.");
        return false;
    }

    /**
     * Mostrar mensaje de agradecimiento y redireccionar después de 5 segundos.
     * @method showThankYouMessageAndRedirect
     * @return {void} No retorna ningún valor.
     */
    alert("Muchas gracias por su compra, le hemos enviado el resumen de compra a su e-mail sobre el envío y facturación, entre otros.\nSera redireccionado al catalogo de zapatillas en 5 segundos.");
    setTimeout(function () {
        //redirecciona al usuario a la página del catálogo de zapatillas. 
        window.location.href = "./main.html"; // Ruta a la página del catálogo de zapatillas
    }, 5000); // 5000 milisegundos = 5 segundos

    return true;
}
