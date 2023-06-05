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
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// Función para obtener las coordenadas del clic en el lienzo
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return { x, y };
}

// Función para dibujar en el lienzo al hacer clic
canvas.addEventListener('click', (event) => {
    const { x, y } = getCursorPosition(event);
    if (isErasing) {
        ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    } else {
        drawPixel(x, y, selectedColor);
    }
});

// Función para cambiar el color seleccionado
function changeColor(color) {
    selectedColor = color;
    isErasing = false;
}

// Función para borrar en el lienzo
function erase() {
    isErasing = true;
}

// Cambiar el color seleccionado al hacer clic en un botón de color
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        changeColor(color);
    });
});

// Borrar en el lienzo al hacer clic en el botón de borrar
const eraseButton = document.getElementById('erase-btn');
eraseButton.addEventListener('click', erase);
