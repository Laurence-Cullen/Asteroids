import React from "react";
import {useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import {BufferGeometry} from "three";

type ModelLoaderProps = {
    filename: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = (props) => {
    const {
        filename
    } = props;

    const stl: BufferGeometry = useLoader(STLLoader, filename);
    stl.computeVertexNormals();

    return (
        <mesh position={[0, 0, 0]} geometry={stl}>
            <meshPhongMaterial
                color={"grey"}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export { ModelLoader };