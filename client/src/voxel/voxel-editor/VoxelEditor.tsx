import React from 'react'
import { Canvas } from '@react-three/fiber'
import {Box} from "../objects/box/Box";

import "./VoxelEditor.scss";
import {RotatingGroup} from "../construct/rotating-group/RotatingGroup";

const VoxelEditor: React.FC<{}> = () => {
    return (
        <Canvas className="voxel-editor">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingGroup rotationVector={[0.1, 0.1]}>
                <Box position={[-1, 0, 0]} />
                <Box position={[0, 0, 0]} />
                <Box position={[1, 0, 0]} />
                <Box position={[0, 1, 0]} />
                <Box position={[0, 2, 0]} />
                <Box position={[0, 3, 0]} />
            </RotatingGroup>
        </Canvas>
    );
}

export { VoxelEditor };
