import React from 'react';
import {VoxelEditor} from "./voxel/voxel-editor/VoxelEditor";
import {ControlContextProvider} from "./control/control-context/ControlContext";
import {Controls} from "./control/Controls";

const App: React.FC = () => {
    return (
        <ControlContextProvider>
            <Controls />
            <VoxelEditor />
        </ControlContextProvider>
    );
};

export { App };