import React, {useMemo} from "react";
import {useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {useControls} from "../../control/control-context/ControlContext";

const ModelLoader = () => {
    const {
        file
    } = useControls();

    console.log("recieved file", file);

    const stl = useMemo(() => {
        if (file) {
            // @ts-ignore
            return useLoader(STLLoader, file.name)
        }
    }, [file]);

    return (
        <mesh position={[0, 0, 0]} geometry={stl}>
            <meshStandardMaterial
                color={"grey"}
            />
        </mesh>
    );
}

export { ModelLoader };