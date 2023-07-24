const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
const pixelSize = 15;
const canvasSize = 30;
const canvasStack = []; // Pila para almacenar las imágenes del lienzo

// Configuración inicial del lienzo
canvas.width = canvasSize * pixelSize;
canvas.height = canvasSize * pixelSize;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Restablecemos el color de dibujo a negro
ctx.fillStyle = '#000000';


const eraseColor = '#ffffff';// Variable para el color de borrado (blanco)
let selectedColor = '#ffffff';// Variables para el color y pincel seleccionado
let isErasing = false;

/**
 * Funcion que dibuja un píxel en las coordenadas especificadas con el color dado.
 * @method drawPixel
 * @param {number} x - La coordenada x del píxel.
 * @param {number} y - La coordenada y del píxel.
 * @param {string} color - El color del píxel en formato hexadecimal.
 * @return {void} No retorna ningún valor.
 */
function drawPixel(x, y, color) {
    // Usar el color seleccionado o el color de borrado según el modo
    const fillColor = isErasing ? eraseColor : color;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    // Ajustar la ubicación y el tamaño del rectángulo según el tamaño del pincel
    const halfBrushSize = Math.floor(brushSize / 2);
    for (let i = x - halfBrushSize; i <= x + halfBrushSize; i++) {
        for (let j = y - halfBrushSize; j <= y + halfBrushSize; j++) {
            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
    }

    // Guardar una copia de la imagen actual en la pila
    const canvasImage = canvas.toDataURL('image/png');
    canvasStack.push(canvasImage);
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
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
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
 * Funcion que activa la opción de borrado en el lienzo. Guarda una copia de la imagen actual del lienzo en la pila "canvasStack".
 * @method erase
 * @param {void}  No recibe ningún parámetro.
 * @return {void} No retorna ningún valor.
 */
function erase() {
    isErasing = true;
    // Establecer el color de dibujo como el color de borrado
    ctx.fillStyle = eraseColor;

    // Guardar una copia de la imagen actual en la pila
    const canvasImage = canvas.toDataURL('image/png');
    canvasStack.push(canvasImage);
}

/**
 * Deshace el último cambio realizado en el lienzo. Enfoque de "pila" (stack) donde se almacenan los cambios realizados en el lienzo en forma de imágenes. Cuando el usuario deshaga un cambio, simplemente se retira la última imagen de la pila y volverás a dibujar el lienzo con la imagen anterior.
 * @method undo
 * @param {void} No recibe ningún parámetro.
 * @return {void} No retorna ningún valor.
 */
function undo() {
    // Verificar que haya al menos una imagen en la pila
    if (canvasStack.length > 0) {
        // Retirar la última imagen de la pila
        canvasStack.pop();

        // Limpiar el lienzo. Asegura que el lienzo esté en blanco y listo para cargar la última imagen de la pila.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cargar la última imagen de la pila en el lienzo
        const lastCanvasImage = new Image();
        lastCanvasImage.onload = function() {
            ctx.drawImage(lastCanvasImage, 0, 0);
        };
        lastCanvasImage.src = canvasStack[canvasStack.length - 1];
    }
}

/**
 * Agrega un evento de clic al botón "Deshacer" para deshacer el último cambio en el lienzo.
 * @method addUndoEvent
 * @param {void} No recibe ningún parámetro.
 * @return {void} No retorna ningún valor.
 */
document.getElementById('undo-btn').addEventListener('click', undo);


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
 * Evento que activa la opción de borrado en el lienzo al hacer clic en el botón de borrar.
 * @method handleEraseButtonClick
 * @param {Event} event - El evento de clic en el botón de borrar.
 * @return {void} No retorna ningún valor.
 */
document.getElementById('erase-btn').addEventListener('click', erase);

// Mostrar las instrucciones al cargar la página
const instructionsContainer = document.getElementById('instructions');
instructionsContainer.style.display = 'block';

// Nueva variable para el tamaño del pincel
let brushSize = 1;

/**
 * Cambia el tamaño del pincel utilizado para dibujar en el lienzo.
 * @method changeBrushSize
 * @param {number} size - El nuevo tamaño del pincel.
 * @return {void} No retorna ningún valor.
 */
function changeBrushSize(size) {
    brushSize = size;
}

// Evento para cambiar el tamaño del pincel cuando se ajusta el input
const brushSizeInput = document.getElementById('brush-size');

/**
 * Evento que cambia el tamaño del pincel al ajustar el valor del campo de entrada.
 * @method handleBrushSizeInputChange
 * @param {Event} event - El evento de entrada, activado cuando el usuario modifica el valor del campo.
 * @return {void} No retorna ningún valor.
 */
brushSizeInput.addEventListener('input', () => {
    changeBrushSize(brushSizeInput.value);
});

/**
 Función que permite descargar el contenido del lienzo como una imagen PNG.
 @method downloadCanvas
 @return {void} No retorna ningún valor.
 */
function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'Diseño $neakers.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

/**
 Evento que permite descargar el contenido del lienzo como una imagen PNG al hacer clic en el botón de descarga.
 @method handleDownloadButtonClick
 @param {Event} event - El evento de clic en el botón de descarga.
 @return {void} No retorna ningún valor.
 */
document.getElementById('download-btn').addEventListener('click', downloadCanvas);
