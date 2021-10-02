import React from 'react'
import {Box} from "../objects/box/Box";

const boxPositions: [number, number, number][] = [
   [-1, 0, 0],
   [1, 0, 0],
   [0, 1, 0],
   [0, 2, 0],
   [0, 3, 0]
];


const VoxelEditor: React.FC<{}> = () => {
    const boxes = boxPositions.map((position, idx) => <Box key={idx} position={position} />);

    return (
        <>
            <Box position={[0, 0, 0]} color='hotpink'/>
            {boxes}
        </>
    );
}

export { VoxelEditor };
