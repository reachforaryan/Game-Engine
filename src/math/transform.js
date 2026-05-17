export function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z,
    };
}

export function translate_z({x, y, z}, dz) {
    return {
        x, y, z: z + dz
    };
}

export function rotate_xz({x, y, z}, angle) {
    // x = xcosθ − zsinθ
    // z = xsinθ + zcosθ
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    };
}
