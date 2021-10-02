import React from 'react'
import {Canvas} from '@react-three/fiber'
import {Box} from "../objects/box/Box";
import {RotatingGroup} from "../construct/rotating-group/RotatingGroup";
import {useControls} from "../../control/control-context/ControlContext";
import {LinePolar} from "../objects/line/LinePolar";
import {CameraControls} from "./CameraControls";
import {GridAxis} from "./GridAxis";

import "./VoxelEditor.scss";

const boxPositions: [number, number, number][] = [
   [-1, 0, 0],
   [1, 0, 0],
   [0, 1, 0],
   [0, 2, 0],
   [0, 3, 0]
];


const VoxelEditor: React.FC<{}> = () => {
    const {
        rotation
    } = useControls();

    const boxes = boxPositions.map((position, idx) => <Box key={idx} position={position} />);

    return (
        <Canvas className="voxel-editor">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingGroup rotation={rotation}>
                <Box position={[0, 0, 0]} color='hotpink'/>
                {boxes}
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
    );
}

export { VoxelEditor };
