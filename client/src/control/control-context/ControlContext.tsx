import React, {useMemo, useState} from "react";

type Rotation = {
    polar: number,
    azimuth: number,
    speed: number
}

type ControlContext = {
    rotation: Rotation; // vec3
    setRotation: (newRotation: Rotation) => void;
}

const ControlContextDefaultValues: ControlContext = {
    rotation: {
        polar: Math.PI/8,
        azimuth: Math.PI/4,
        speed: 0.01
    },
    setRotation: () => {}
}

const Context = React.createContext<ControlContext>(ControlContextDefaultValues);

const ControlContextProvider: React.FC = (props) => {
    const { children } = props;

    const [rotation, setRotation] = useState<Rotation>(ControlContextDefaultValues.rotation);

   const context = useMemo(() => {
       return {
           rotation,
           setRotation
       }
    }, [rotation]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useControls = () => React.useContext(Context);

export { ControlContextProvider, useControls, Rotation };
