import React from 'react'
import {Canvas} from '@react-three/fiber'
import {Box} from "../objects/box/Box";
import {RotatingGroup} from "../construct/rotating-group/RotatingGroup";
import {useControls} from "../../control/control-context/ControlContext";
import {LinePolar} from "../objects/line/LinePolar";
import {CameraControls} from "./CameraControls";

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

    const boxes = boxPositions.map((position) => <Box position={position} />);

    return (
        <Canvas className="voxel-editor">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingGroup rotationVector={rotation}>
                <Box position={[0, 0, 0]} color='hotpink'/>
                {boxes}
            </RotatingGroup>
            <LinePolar
                start={[0, 0, 0]}
                length={1000}
                polarAngle={Math.PI}
                azimuthAngle={0}
            />
            <CameraControls />
        </Canvas>
    );
}

export { VoxelEditor };
