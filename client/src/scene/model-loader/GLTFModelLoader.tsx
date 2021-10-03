import React from "react";
import {useLoader} from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

type ModelLoaderProps = {
    filename: string;
    position: [number, number, number];
    rotation: THREE.Euler,
    scale: number
}

const GLTFModelLoader: React.FC<ModelLoaderProps> = (props) => {
    const {
        filename,
        position,
        rotation,
        scale
    } = props;

    const gltf = useLoader(GLTFLoader, filename)
    return (
        <group rotation={rotation} position={position} scale={scale}>
            <primitive object={gltf.scene}/>
        </group>
    )
}

export { GLTFModelLoader };
