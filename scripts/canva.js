const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
const pixelSize = 10;
const canvasSize = 20;

// Configuración inicial del lienzo
canvas.width = canvasSize * pixelSize;
canvas.height = canvasSize * pixelSize;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Variables para el color y pincel seleccionado
let selectedColor = '#000000';
let isErasing = false;

// Función para dibujar un píxel
/**
 * Funcion que dibuja un píxel en las coordenadas especificadas con el color dado.
 * @method drawPixel
 * @param {number} x - La coordenada x del píxel.
 * @param {number} y - La coordenada y del píxel.
 * @param {string} color - El color del píxel en formato hexadecimal.
 * @return {void} No retorna ningún valor.
 */
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

/**
 * Funcion que obtiene las coordenadas (x, y) del lienzo a partir del evento de clic.
 * @method getCursorPosition
 * @param {Event} event - El evento de clic.
 * @return {Object} Un objeto con las propiedades x e y que representan las coordenadas.
 */
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return { x, y };
}

/**
 * Funcion que dibuja en el lienzo al hacer clic en las coordenadas obtenidas del evento.
 * Si la opción de borrado está activada, se borra el píxel en las coordenadas.
 * @method handleCanvasClick
 * @param {Event} event - El evento de clic en el lienzo.
 * @return {void} No retorna ningún valor.
 */
canvas.addEventListener('click', (event) => {
    const { x, y } = getCursorPosition(event);
    if (isErasing) {
        ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    } else {
        drawPixel(x, y, selectedColor);
    }
});

/**
 * Cambia el color seleccionado para dibujar en el lienzo.
 * @method changeColor
 * @param {string} color - El nuevo color en formato hexadecimal.
 * @return {void} No retorna ningún valor.
 */
function changeColor(color) {
    selectedColor = color;
    isErasing = false;
}

/**
 * Funcion que activa la opción de borrado en el lienzo.
 * @method erase
 * @return {void} No retorna ningún valor.
 */
function erase() {
    isErasing = true;
}

/**
 * Cambia el color seleccionado para dibujar en el lienzo al hacer clic en un botón de color.
 * @method handleColorButtonClick
 * @param {Event} event - El evento de clic en el botón de color.
 * @return {void} No retorna ningún valor.
 */
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        changeColor(color);
    });
});

/**
 * Activa la opción de borrado en el lienzo al hacer clic en el botón de borrar.
 * @method handleEraseButtonClick
 * @param {Event} event - El evento de clic en el botón de borrar.
 * @return {void} No retorna ningún valor.
 */
const eraseButton = document.getElementById('erase-btn');
eraseButton.addEventListener('click', erase);
