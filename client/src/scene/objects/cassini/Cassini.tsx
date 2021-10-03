import React, {Suspense} from "react";
import {GLTFModelLoader} from "../../model-loader/GLTFModelLoader";
import {Box} from "../box/Box";
import {Euler} from "three";

const CAMERA_POSITION: [number, number, number] = [0, 50, 0];

/**
 * Cassini is the "camera" for the scene, and where the images of the asteroid are captured from
 */
const Cassini: React.FC<{}> = () => {

    return (
        <Suspense fallback={<Box position={CAMERA_POSITION} />}>
            <GLTFModelLoader
                filename={'./spacecraft/cassini.gltf'}
                position={CAMERA_POSITION}
                rotation={new Euler(Math.PI, 0, 0)} // Rotate it so it points at the object, so it looks nice :)
            />
        </Suspense>
    )
}

export { Cassini, CAMERA_POSITION };
