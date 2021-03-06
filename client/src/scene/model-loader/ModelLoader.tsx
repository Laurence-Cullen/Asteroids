import React, {MutableRefObject, useLayoutEffect, useRef} from "react";
import {useLoader} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import {BufferGeometry, Object3D, Vector3} from "three";

const MODEL_SIZE = 10;

type ModelLoaderProps = {
    filename: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = (props) => {
    const {
        filename
    } = props;

    const stl: BufferGeometry = useLoader(STLLoader, filename);

    const ref: MutableRefObject<Object3D | null> = useRef(null)

    // Scale the incoming files so they're around the same size
    useLayoutEffect(() => {
        if (ref.current) {
            stl.computeVertexNormals();

            ref.current.scale.set(1, 1, 1);

            const boundingBox = new THREE.Box3().setFromObject(ref.current);
            let result: Vector3 = new THREE.Vector3();
            boundingBox.getSize(result);

            const [
                xSize,
                ySize,
                zSize
            ] = result.toArray();

            // Find biggest side and scale via that
            let scaleFactor = 1;
            if (xSize >= ySize && xSize >= zSize) {
                scaleFactor = MODEL_SIZE / xSize;
            } else if (ySize >= xSize && ySize >= zSize) {
                scaleFactor = MODEL_SIZE / ySize;
            } else if (zSize >= xSize && zSize >= ySize) {
                scaleFactor = MODEL_SIZE / zSize;
            }

            ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
    }, [ref.current, stl])

    return (
        <>
            <mesh
                ref={ref}
                position={[0, 0, 0]}
                geometry={stl}
            >
                <meshPhongMaterial
                    color={"grey"}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
);
}

export { ModelLoader };
