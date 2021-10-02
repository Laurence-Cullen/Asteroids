import React from 'react';
import {Line} from "./Line";

type LinePolarProps = {
    start: [number, number, number];
    length: number;
    azimuthAngle: number; // left right, phi
    polarAngle: number;   // top down (north to south), theta
}

const LinePolar: React.FC<LinePolarProps> = (props) => {
    const {
        start,
        length,
        azimuthAngle,
        polarAngle
    } = props;

    // x = r*cos(phi)sin(theta)
    const x = length * Math.cos(azimuthAngle) * Math.sin(polarAngle);

    // y = r*sin(phi)sin(theta)
    const y = length * Math.sin(azimuthAngle) * Math.sin(polarAngle);

    // z = r*cos(theta)
    const z = length * Math.cos(azimuthAngle);

    const end: [number, number, number] = [x, y, z];
    
    return <Line start={start} end={end} />
}

export { LinePolar };