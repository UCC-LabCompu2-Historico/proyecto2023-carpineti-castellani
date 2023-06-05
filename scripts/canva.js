const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
const pixelSize = 10;
const canvasSize = 20;

// Configuración inicial del lienzo
canvas.width = canvasSize * pixelSize;
canvas.height = canvasSize * pixelSize;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Variable para el color seleccionado
let selectedColor = '#000000';

// Función para dibujar un píxel
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// Función para obtener las coordenadas del lienzo a partir del evento de clic
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return { x, y };
}

// Función para dibujar en el lienzo al hacer clic
canvas.addEventListener('click', (event) => {
    const { x, y } = getCursorPosition(event);
    drawPixel(x, y, selectedColor);
});

// Cambiar el color seleccionado al seleccionar un color en el color picker
const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', () => {
    selectedColor = colorPicker.value;
});

// Borrar todo el contenido del lienzo
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Descargar la imagen del lienzo al hacer clic en el botón de descargar
const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'canvas.png';
    link.click();
});

