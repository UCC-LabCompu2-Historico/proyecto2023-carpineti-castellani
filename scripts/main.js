/**
 * Obtener todos los botones de compra que tienen la clase "Comprar".
 * @method getAllCompraButtons
 * @return {NodeList} Una lista de nodos que representa los botones de compra.
 */
const buttons = document.querySelectorAll('.Comprar');

/**
 * Agregar evento de clic a cada botón de compra.
 * @method addClickEventToButtons
 * @return {void} No retorna ningún valor.
 */
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtener los datos de la zapatilla
        //Aquí se busca el elemento padre más cercano al botón que tenga la clase CSS llamada "product".
        const product = button.closest('.product');
        //Se obtiene el contenido del elemento <h3> dentro del elemento "product". se asume que h3 tiene el nombre del producto
        const name = product.querySelector('h3').textContent;
        const priceElement = product.querySelector('p'); //p : pecio
        const priceText = priceElement.textContent;
        //replace() para eliminar la parte del texto "Precio: $" y obtener solo el valor numérico
        const price = priceText.replace('Precio: $', '');

        // Redireccionar al formulario con los datos en la URL
        //encode(...) para codificar los valores del nombre y el precio, asegurando que cualquier carácter especial o espacio sea tratado adecuadamente en la URL.
        const formUrl = `form.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        //Se redirecciona al comprador al formulario
        window.location.href = formUrl;
    });
});

