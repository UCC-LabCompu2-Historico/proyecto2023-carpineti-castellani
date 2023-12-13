//Obtencion del lienzo del DOM y su contexto ctx
const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');

// Configuración inicial del lienzo y se establece el color de dibujo a negro
const pixelSize = 15;
const canvasSize = 30;
const canvasStack = []; // Pila para almacenar las imágenes del lienzo
canvas.width = canvasSize * pixelSize;
canvas.height = canvasSize * pixelSize;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#000000';

//Estas variables se utilizan para gestionar el color de dibujo seleccionado y la opción de borrado.
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
    //determina qué color se utilizará para dibujar el píxel. Si isErasing es true, se usará el color de borrado (eraseColor)
    const fillColor = isErasing ? eraseColor : color;
    ctx.fillStyle = fillColor;
    //dibuja el píxel en las coordenadas especificadas (x, y) en el lienzo.
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    // Ajustar la ubicación y el tamaño del rectángulo según el tamaño del pincel
    //Math.floor() en el cálculo es para asegurarse de que halfBrushSize sea un número entero. Redondea hacia abajo
    const halfBrushSize = Math.floor(brushSize / 2);
    for (let i = x - halfBrushSize; i <= x + halfBrushSize; i++) {
        for (let j = y - halfBrushSize; j <= y + halfBrushSize; j++) {
            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
    }

    // Guardar una copia de la imagen actual en la pila
    //Toma una imagen de lo que se dibuja y lo convierte en un URL
    const canvasImage = canvas.toDataURL('image/png');
    //La pila canvasStack se utiliza para almacenar copias del contenido del lienzo
    canvasStack.push(canvasImage);
}

/**
 * Funcion que obtiene las coordenadas (x, y) del lienzo a partir del evento de clic.
 * @method getCursorPosition
 * @param {Event} event - El evento de clic.
 * @return {Object} Un objeto con las propiedades x e y que representan las coordenadas.
 */
function getCursorPosition(event) {
    //obtiene el rectángulo (bounding box) del elemento canvas
    const rect = canvas.getBoundingClientRect();
    //coordenada x dentro del lienzo utilizando el evento de clic (event.clientX) y la p
    //Posición izquierda del rectángulo del lienzo (rect.left)
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return {x, y};
}

/**
 * Funcion que dibuja en el lienzo al hacer clic en las coordenadas obtenidas del evento.
 * Si la opción de borrado está activada, se borra el píxel en las coordenadas.
 * @method handleCanvasClick
 * @param {Event} event - El evento de clic en el lienzo.
 * @return {void} No retorna ningún valor.
 */

canvas.addEventListener('click', (event) => { //agrega un event listener
    const {x, y} = getCursorPosition(event);
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
    // Verificar que haya al menos una imagen en la pila canvasStack
    if (canvasStack.length > 0) {
        // Retirar la última imagen de la pila con pop(), eliminando la ultima copia
        canvasStack.pop();

        // Limpiar el lienzo. Asegura que el lienzo esté en blanco y listo para cargar la última imagen de la pila.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cargar la última imagen de la pila en el lienzo
        // Se crea un nuevo objeto de imagen llamado lastCanvasImage
        const lastCanvasImage = new Image();
        //Este evento ´onload´ se activa cuando la imagen se ha cargado completamente
        lastCanvasImage.onload = function () {
            ctx.drawImage(lastCanvasImage, 0, 0); //Esquina sup izq
        };
        //Antes de asignar la fuente (src) de la imagen lastCanvasImage, se obtiene la última imagen
        // almacenada en la pila (que es la imagen que se quiere deshacer).
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
    //Se crea el elemento a que se guarda en link
    const link = document.createElement('a');
    link.download = 'Diseño $neakers.png';
    //devuelve la representación del contenido del lienzo como una URL de datos en formato PNG.
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

let isAnimating = false; // Variable para controlar el estado de la animación

/**
 * Función para obtener un color aleatorio en formato hexadecimal.
 * @method getRandomColor
 * @return {string} Un color en formato hexadecimal.
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Función para animar el lienzo utilizando requestAnimationFrame.
 * @method animateCanvas
 * @return {void} No retorna ningún valor.
 */
function animateCanvas() {
    if (!isAnimating) {
        return;
    }

    // Generar coordenadas aleatorias para el píxel a cambiar de color
    const x = Math.floor(Math.random() * canvasSize);
    const y = Math.floor(Math.random() * canvasSize);

    // Obtener el color actual del píxel en esa coordenada
    const currentColor = ctx.fillStyle;

    // Generar un nuevo color aleatorio
    const newColor = getRandomColor();

    // Cambiar el color del píxel en esa coordenada por el nuevo color aleatorio
    drawPixel(x, y, newColor);

    // Llamar a animateCanvas() nuevamente para generar una animación continua
    requestAnimationFrame(animateCanvas);
}

// Llamar a animateCanvas() para iniciar la animación
animateCanvas();


/**
 * Función para mostrar el mensaje de inspiración y ocultar el botón "INSPIRATE".
 * @method showInspirationMessage
 * @return {void} No retorna ningún valor.
 */
function showInspirationMessage() {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = "Interesante combinacion de colores. De ser que no te convenza, reinicia la pagina e intentalo de nuevo. EXITOS!."
    messageContainer.style.display = 'block';

    // Ocultar el botón "INSPIRATE"
    const startAnimationBtn = document.getElementById('start-animation-btn');
    startAnimationBtn.style.display = 'none';

    // Mostrar el botón "Detener"
    const stopAnimationBtn = document.getElementById('stop-animation-btn');
    stopAnimationBtn.style.display = 'inline-block';
}

/**
 * Evento que activa la opción de inspiración al hacer clic en el botón "INSPIRATE".
 * @method handleStartAnimationButtonClick
 * @param {Event} event - El evento de clic en el botón "INSPIRATE".
 * @return {void} No retorna ningún valor.
 */
document.getElementById('start-animation-btn').addEventListener('click', () => {
    isAnimating = true; // Activar la animación
    animateCanvas(); // Iniciar la animación
    showInspirationMessage(); // Mostrar mensaje de inspiración y ocultar botón "INSPIRATE"
});

/**
 * Evento que detiene la animación al hacer clic en el botón "Detener".
 * @method handleStopAnimationButtonClick
 * @param {Event} event - El evento de clic en el botón "Detener".
 * @return {void} No retorna ningún valor.
 */
document.getElementById('stop-animation-btn').addEventListener('click', () => {
    isAnimating = false; // Desactivar la animación
    // Volver a mostrar el botón "INSPIRATE"
    const startAnimationBtn = document.getElementById('start-animation-btn');
    startAnimationBtn.style.display = 'inline-block';
    // Ocultar el botón "Detener"
    const stopAnimationBtn = document.getElementById('stop-animation-btn');
    stopAnimationBtn.style.display = 'none';
});

let isMouseDown = false;

// Agregar evento para el movimiento del mouse
canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const { x, y } = getCursorPosition(event);
        if (isErasing) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        } else {
            drawPixel(x, y, selectedColor);
        }
    }
});

// Agregar eventos para el inicio y fin del clic del mouse
canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Configuración inicial del lienzo y se establece el color de dibujo a negro
const initialPixelSize = 15;  // Grosor inicial del píxel

/**
 * Función que dibuja un píxel en las coordenadas especificadas con el color dado y el tamaño del pincel.
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
 * Cambia el tamaño del pincel utilizado para dibujar en el lienzo.
 * @method changeBrushSize
 * @param {number} size - El nuevo tamaño del pincel.
 * @return {void} No retorna ningún valor.
 */


// Agregar evento para el movimiento del mouse
canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const { x, y } = getCursorPosition(event);
        if (isErasing) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        } else {
            drawPixel(x, y, selectedColor);
        }
    }
});

// Agregar eventos para el inicio y fin del clic del mouse
canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

/**
 * Función que dibuja un píxel en las coordenadas especificadas con el color dado y el tamaño del pincel.
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
 * Funcion que activa la opción de borrado en el lienzo. Guarda una copia de la imagen actual del lienzo en la pila "canvasStack".
 * @method erase
 * @param {void}  No recibe ningún parámetro.
 * @return {void} No retorna ningún valor.
 */
function erase() {
    isErasing = !isErasing; // Alternar entre modo borrado y modo dibujo
    // Establecer el color de dibujo como el color de borrado
    ctx.fillStyle = isErasing ? eraseColor : selectedColor;

    // Guardar una copia de la imagen actual en la pila
    const canvasImage = canvas.toDataURL('image/png');
    canvasStack.push(canvasImage);
}

