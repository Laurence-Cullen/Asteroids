import React from "react";
import {Sphere} from "../sphere/Sphere";
import {polarAngleToCartesian} from "../../../framework/util/PolarAngleToCartesian";

type SunProps = {
    polarAngle: number,
    azimuthAngle: number
    distance: number
}

const Sun: React.FC<SunProps> = (props) => {
    const {
        polarAngle,
        azimuthAngle,
        distance
    } = props;

    const position = polarAngleToCartesian(polarAngle, azimuthAngle, distance);

    return (
        <>
            <ambientLight intensity={0.05} />
            <directionalLight position={position} intensity={2} />
            <Sphere position={position} color='orange'/>
        </>
    )
}

export { Sun };
