import React from 'react';
import {ControlContextProvider} from "./control/control-context/ControlContext";
import {Controls} from "./control/Controls";
import {Scene} from "./scene/Scene";

const App: React.FC = () => {
    return (
        <ControlContextProvider>
            <Controls />
            <Scene />
        </ControlContextProvider>
    );
};

export { App };