import { Renderer } from './src/graphics/Renderer.js';
import { Engine } from './src/core/Engine.js';
import { cubeVertices, cubeFaces } from './src/entities/Cube.js';
import { project, translate_z, rotate_xz } from './src/math/transform.js';

const renderer = new Renderer("game", 800, 800);

let dz = 1;
let angle = 0;

function update(dt) {
    // Math.PI * dt ensures consistent rotation speed regardless of framerate
    angle += Math.PI * dt;
}

function render() {
    renderer.clear();

    for (const f of cubeFaces) {
        for (let i = 0; i < f.length; ++i) {
            const a = cubeVertices[f[i]];
            const b = cubeVertices[f[(i + 1) % f.length]];
            
            const projectedA = renderer.screen(project(translate_z(rotate_xz(a, angle), dz)));
            const projectedB = renderer.screen(project(translate_z(rotate_xz(b, angle), dz)));
            
            renderer.line(projectedA, projectedB);
        }
    }
}

// Start the engine
const engine = new Engine(update, render);
engine.start();
