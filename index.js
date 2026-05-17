import { Renderer } from './src/graphics/Renderer.js';
import { Engine } from './src/core/Engine.js';
import { MODELS } from './src/entities/index.js';

// Setup DOM elements
const elFps = document.getElementById('val-fps');
const elFrameTime = document.getElementById('val-frametime');
const elPolygons = document.getElementById('val-polygons');
const elVertices = document.getElementById('val-vertices');
const elSpeedSlider = document.getElementById('speed-slider');
const elSpeedVal = document.getElementById('val-speed');
const elModelSelect = document.getElementById('model-select');
const elModelBadge = document.getElementById('model-badge');

// Canvas responsive sizing
const canvasContainer = document.querySelector('.canvas-container');
let canvasWidth = canvasContainer.clientWidth || 800;
let canvasHeight = canvasContainer.clientHeight || 600;

const renderer = new Renderer("game", canvasWidth, canvasHeight);

// Keep renderer size in sync with container
window.addEventListener('resize', () => {
    renderer.width = canvasContainer.clientWidth;
    renderer.height = canvasContainer.clientHeight;
    renderer.canvas.width = renderer.width;
    renderer.canvas.height = renderer.height;
});

// Setup dynamic model selection
elModelSelect.innerHTML = '';
Object.values(MODELS).forEach(model => {
    const option = document.createElement('option');
    option.value = model.id;
    option.textContent = model.name;
    elModelSelect.appendChild(option);
});

// State
let currentModel = Object.values(MODELS)[0]; // Dynamically pick the first available model
if (currentModel) {
    elModelSelect.value = currentModel.id;
}

let angle = 0;
let angleY = 0;
let rotationSpeed = 1.0;

// Event listeners for controls
elSpeedSlider.addEventListener('input', (e) => {
    rotationSpeed = parseFloat(e.target.value);
    elSpeedVal.textContent = rotationSpeed.toFixed(1) + 'x';
});

elModelSelect.addEventListener('change', (e) => {
    currentModel = MODELS[e.target.value] || Object.values(MODELS)[0];
    updateMetricsUI();
});

function updateMetricsUI() {
    if (!currentModel) return;
    elModelBadge.textContent = `Model: ${currentModel.name}`;
    elPolygons.textContent = currentModel.faces.length.toLocaleString();
    elVertices.textContent = currentModel.vertices.length.toLocaleString();
}

// Initial UI setup
updateMetricsUI();
elSpeedSlider.value = rotationSpeed;
elSpeedVal.textContent = rotationSpeed.toFixed(1) + 'x';

// FPS Calculation variables
let frames = 0;
let fpsTimer = 0;

function update(dt) {
    // Math.PI * dt ensures consistent rotation speed
    angle += Math.PI * dt * 0.5 * rotationSpeed;
    angleY += Math.PI * dt * 0.3 * rotationSpeed;
    
    // FPS Calc
    frames++;
    fpsTimer += dt;
    if (fpsTimer >= 1.0) {
        elFps.textContent = frames;
        frames = 0;
        fpsTimer -= 1.0;
    }

    // Update frame time
    elFrameTime.textContent = (dt * 1000).toFixed(1);
}

function render() {
    renderer.clear();
    
    if (!currentModel) return;
    
    // Let the Renderer handle the transformation and wireframe rendering
    renderer.drawWireframe(currentModel.vertices, currentModel.faces, {
        angleX: angle,
        angleY: angleY,
        dz: currentModel.defaultDz
    });
}

// Start the engine
const engine = new Engine(update, render);
engine.start();
