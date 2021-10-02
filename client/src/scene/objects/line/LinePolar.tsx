import React from 'react';
import {Line} from "./Line";
import {polarAngleToCartesian} from "../../../framework/util/PolarAngleToCartesian";

type LinePolarProps = {
    start: [number, number, number];
    length: number;
    azimuthAngle: number; // left right, phi
    polarAngle: number;   // top down (north to south), theta,
    color?: string;
}

const LinePolar: React.FC<LinePolarProps> = (props) => {
    const {
        start,
        length,
        azimuthAngle,
        polarAngle,
        color
    } = props;

    const end = polarAngleToCartesian(polarAngle, azimuthAngle, length);

    return <Line start={start} end={end} color={color ? color : 'white'} />
}

export { LinePolar };