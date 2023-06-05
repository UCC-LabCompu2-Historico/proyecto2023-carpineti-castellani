// Obtener todos los botones de compra
const buttons = document.querySelectorAll('.Comprar');

// Agregar evento de clic a cada botÃ³n
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtener los datos de la zapatilla
        const product = button.closest('.product');
        const name = product.querySelector('h3').textContent;
        const priceElement = product.querySelector('p');
        const priceText = priceElement.textContent;
        const price = priceText.replace('Precio: $', '');

        // Redireccionar al formulario con los datos en la URL
        const formUrl = `form.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        window.location.href = formUrl;
    });
});