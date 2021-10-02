import {Camera} from "three/src/Three";
import React from "react";
import {extend, useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: {
                args: [object: Camera, domElement?: HTMLElement]
            }
        }
    }
}

const CameraControls = () => {
    const { gl: { domElement }, camera } = useThree()

    extend({ OrbitControls });

    return (
        <orbitControls
            args={[camera, domElement]}
        />
    )
}

export { CameraControls };
