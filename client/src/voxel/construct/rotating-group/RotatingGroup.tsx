import React, {MutableRefObject, useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three';
import {Rotation} from "../../../control/control-context/ControlContext";
import {polarAngleToCartesian} from "../../../framework/util/PolarAngleToCartesian";
import {Vector3} from "three";

type RotatingGroupProps = {
    rotation: Rotation
};

const RotatingGroup: React.FC<RotatingGroupProps> = (props) => {
    const {
        children,
        rotation
    } = props;

    const {
       polar,
       azimuth,
       speed
    } = rotation;

    const ref: MutableRefObject<THREE.Group | null> = useRef(null)

    // Reset orientation on
    useEffect(() => {
        if (ref.current !== null && ref.current.rotation !== undefined) {
            ref.current.rotation.x = 0;
            ref.current.rotation.y = 0;
            ref.current.rotation.z = 0;
        }
    }, [polar, azimuth])

    useFrame(() => {
        const axis = polarAngleToCartesian(polar, azimuth, 1);

        if (ref.current !== null && ref.current.rotation !== undefined) {
            ref.current.rotateOnWorldAxis(new Vector3(...axis).normalize(), speed)
        }
    })

    return (
        <group ref={ref}>
            {children}
        </group>
    )
}

export { RotatingGroup };
