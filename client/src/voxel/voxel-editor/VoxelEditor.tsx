import React from 'react'
import { Canvas } from '@react-three/fiber'
import {Box} from "../Box";

import "./VoxelEditor.scss";

const VoxelEditor: React.FC<{}> = () => {
    return (
        <Canvas className="voxel-editor">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1, 0, 0]} />
            <Box position={[0, 0, 0]} />
            <Box position={[1, 0, 0]} />
            <Box position={[0, 1, 0]} />
            <Box position={[0, 2, 0]} />
            <Box position={[0, 3, 0]} />
        </Canvas>
    );
}

export { VoxelEditor };
