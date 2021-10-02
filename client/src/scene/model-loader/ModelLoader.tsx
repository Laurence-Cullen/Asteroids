import React from "react";
import {useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";

type ModelLoaderProps = {
    filename: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = (props) => {
    const {
        filename
    } = props;

    const stl = useLoader(STLLoader, filename);

    return (
        <mesh position={[0, 0, 0]} geometry={stl}>
            <meshStandardMaterial
                color={"grey"}
            />
        </mesh>
    );
}

export { ModelLoader };