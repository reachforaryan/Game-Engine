import { cubeVertices as simpleVertices, cubeFaces as simpleFaces } from './Cube.js';
import { cubeVertices as pengerVertices, cubeFaces as pengerFaces } from './penger.js';

export const MODELS = {
    cube: {
        id: 'cube',
        name: 'Simple Cube',
        vertices: simpleVertices,
        faces: simpleFaces,
        defaultDz: 2.0
    },
    penger: {
        id: 'penger',
        name: 'Penger Model',
        vertices: pengerVertices,
        faces: pengerFaces,
        defaultDz: 1.5
    }
};
