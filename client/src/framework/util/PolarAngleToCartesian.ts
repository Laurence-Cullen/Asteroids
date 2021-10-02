const polarAngleToCartesian = (
    polarAngle: number,  // top down (north to south), theta
    azimuthAngle: number, // left right, phi
    length: number = 1
): [number, number, number] => {
    const x = length * Math.cos(azimuthAngle) * Math.sin(polarAngle);

    // y = r*sin(phi)sin(theta)
    const y = length * Math.sin(azimuthAngle) * Math.sin(polarAngle);

    // z = r*cos(theta)
    const z = length * Math.cos(polarAngle);

    return [x, y, z];
}

export { polarAngleToCartesian };
