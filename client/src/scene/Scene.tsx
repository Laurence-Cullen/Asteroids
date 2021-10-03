import React from "react";
import {Canvas} from "@react-three/fiber";
import {GridAxis} from "./voxel-editor/GridAxis";
import {CameraControls} from "./voxel-editor/CameraControls";
import {useControls} from "../control/control-context/ControlContext";
import {Sun} from "./objects/sun/Sun";
import {Effects} from "./effect/Effects";
import {Background} from "./objects/background/Background";
import {Cassini} from "./objects/cassini/Cassini";
import {Vectors} from "./voxel-editor/Vectors";
import {Asteroid} from "./objects/asteroid/Asteroid";

import "./Scene.scss";

const Scene: React.FC = () => {

    const {
        rotation,
        lightDirection,
        file,
        drawVectors,
        drawGrid,
        drawBackground
    } = useControls();

    return (
        <Canvas className="scene">
            <Background drawBackground={drawBackground} />
            <Cassini />
            <Asteroid file={file} rotation={rotation} />
            <Sun
                distance={1000}
                polarAngle={lightDirection.polar}
                azimuthAngle={lightDirection.azimuth}
            />
            {drawVectors && <Vectors rotation={rotation} lightDirection={lightDirection} />}
            {drawGrid && <GridAxis/>}
            <CameraControls />
            <Effects />
        </Canvas>
    )
}

export { Scene };
