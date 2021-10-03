import {Camera} from "three/src/Three";
import React, {MutableRefObject, useLayoutEffect, useRef} from "react";
import {extend, useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CAMERA_POSITION} from "../objects/cassini/Cassini";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: {
                args: [object: Camera, domElement?: HTMLElement],
                ref?: MutableRefObject<any>
            }
        }
    }
}

type CameraControlsProps = {
    fixCamera: boolean;
}

const CameraControls: React.FC<CameraControlsProps> = (props) => {
    const {
        fixCamera
    } = props;

    const { gl: { domElement }, camera } = useThree()

    extend({ OrbitControls });
    
    const ref: MutableRefObject<any> = useRef(null);
    
    useLayoutEffect(() => {
        if (ref.current) {
            const orbitControls: OrbitControls = ref.current;

            // Lock camera to position
            if (fixCamera) {
                const position = CAMERA_POSITION.map((pos) => (pos * 0.95)) as [number, number, number];
                camera.position.set( ...position);
                orbitControls.enabled = false;
            } else {
                orbitControls.enabled = true;
            }

            orbitControls.update();
        }
    }, [ref, fixCamera])

    return (
        <orbitControls
            ref={ref}
            args={[camera, domElement]}
        />
    )
}

export { CameraControls };
