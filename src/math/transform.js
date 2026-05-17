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
    // x = xcos(theta) - ysin(theta)
    // y = xsin(theta) + ycos(theta)
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    };
}

export function rotate_yz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x,
        y: y * c - z * s,
        z: y * s + z * c,
    };
}

export function rotate_xy({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x * c - y * s,
        y: x * s + y * c,
        z,
    };
}
