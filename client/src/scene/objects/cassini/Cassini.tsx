import React, {Suspense} from "react";
import {GLTFModelLoader} from "../../model-loader/GLTFModelLoader";
import {Box} from "../box/Box";
import {Euler} from "three";

const Cassini: React.FC<{}> = () => {

    return (
        <Suspense fallback={<Box position={[0, 50, 0]} />}>
            <GLTFModelLoader
                filename={'./spacecraft/cassini.gltf'}
                position={[0, 50, 0]}
                rotation={new Euler(Math.PI, 0, 0)}
            />
        </Suspense>
    )
}

export { Cassini };
