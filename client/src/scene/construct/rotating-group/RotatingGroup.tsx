import React, {MutableRefObject, useEffect, useMemo, useRef} from "react";
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

    // Reset orientation on reset
    useEffect(() => {
        if (ref.current !== null && ref.current.rotation !== undefined) {
            ref.current.rotation.x = 0;
            ref.current.rotation.y = 0;
            ref.current.rotation.z = 0;
        }
    }, [polar, azimuth])


    // Recompute rotation vector if it changes
    const rotationVector: Vector3 = useMemo(() => {
        const axis = polarAngleToCartesian(polar, azimuth, 1);
        return new Vector3(...axis);
    }, [polar, azimuth])

    useFrame(() => {
        if (ref.current !== null && ref.current.rotation !== undefined) {
            ref.current.rotateOnWorldAxis(rotationVector, speed)
        }
    })

    return (
        <group ref={ref}>
            {children}
        </group>
    )
}

export { RotatingGroup };
