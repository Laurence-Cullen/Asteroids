import React from "react";
import {Canvas} from "@react-three/fiber";
import {RotatingGroup} from "./construct/rotating-group/RotatingGroup";
import {LinePolar} from "./objects/line/LinePolar";
import {GridAxis} from "./voxel-editor/GridAxis";
import {CameraControls} from "./voxel-editor/CameraControls";
import {VoxelEditor} from "./voxel-editor/VoxelEditor";
import {useControls} from "../control/control-context/ControlContext";

import "./Scene.scss";

const Scene: React.FC = () => {

    const {
        rotation
    } = useControls();

    return (
        <Canvas className="scene">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingGroup rotation={rotation}>
                <VoxelEditor />
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
