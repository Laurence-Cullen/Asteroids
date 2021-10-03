import React, { Suspense } from "react";
import {Canvas} from "@react-three/fiber";
import {RotatingGroup} from "./construct/rotating-group/RotatingGroup";
import {LinePolar} from "./objects/line/LinePolar";
import {GridAxis} from "./voxel-editor/GridAxis";
import {CameraControls} from "./voxel-editor/CameraControls";
import {useControls} from "../control/control-context/ControlContext";
import {ModelLoader} from "./model-loader/ModelLoader";
import {Box} from "./objects/box/Box";
import {VoxelEditor} from "./voxel-editor/VoxelEditor";
import {Sun} from "./objects/sun/Sun";
import {Effects} from "./effect/Effects";
import {Background} from "./objects/background/Background";

import "./Scene.scss";
import {Cassini} from "./objects/cassini/Cassini";

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
            <RotatingGroup rotation={rotation}>
                <Suspense fallback={<Box position={[0, 0, 0]} />}>
                    {file ? <ModelLoader filename={file}/> : <VoxelEditor /> }
                </Suspense>
            </RotatingGroup>
            <Sun
                distance={1000}
                polarAngle={lightDirection.polar}
                azimuthAngle={lightDirection.azimuth}
            />
            {
                drawVectors &&
                (
                    <>
                        <LinePolar
                            start={[0, 0, 0]}
                            length={100}
                            polarAngle={lightDirection.polar}
                            azimuthAngle={lightDirection.azimuth}
                        />
                        <LinePolar
                            start={[0, 0, 0]}
                            length={10}
                            polarAngle={rotation.polar}
                            azimuthAngle={rotation.azimuth}
                        />
                    </>
                )
            }
            {drawGrid && <GridAxis/>}
            <CameraControls />
            <Effects />
        </Canvas>
    )
}

export { Scene };
