import React, { Suspense } from "react";
import {Canvas} from "@react-three/fiber";
import {RotatingGroup} from "./construct/rotating-group/RotatingGroup";
import {LinePolar} from "./objects/line/LinePolar";
import {GridAxis} from "./voxel-editor/GridAxis";
import {CameraControls} from "./voxel-editor/CameraControls";
import {useControls} from "../control/control-context/ControlContext";
import {ModelLoader} from "./model-loader/ModelLoader";
import {Box} from "./objects/box/Box";

import "./Scene.scss";
import {VoxelEditor} from "./voxel-editor/VoxelEditor";

const Scene: React.FC = () => {

    const {
        rotation,
        file
    } = useControls();

    return (
        <Canvas className="scene">
            <ambientLight />
            <RotatingGroup rotation={rotation}>
                <Suspense fallback={<Box position={[0, 0, 0]} />}>
                    {file ? <ModelLoader filename={file}/> : <VoxelEditor /> }
                </Suspense>
            </RotatingGroup>
            <LinePolar
                start={[0, 0, 0]}
                length={100}
                polarAngle={rotation.polar}
                azimuthAngle={rotation.azimuth}
            />
            <GridAxis />
            <CameraControls />
        </Canvas>
    )
}

export { Scene };
