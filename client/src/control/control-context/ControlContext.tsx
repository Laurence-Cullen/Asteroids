import React, {useMemo, useState} from "react";

type Rotation = {
    polar: number,
    azimuth: number,
    speed: number
}

type ControlContext = {
    rotation: Rotation;
    setRotation: (newRotation: Rotation) => void;
    file: string | null,
    setFile: (fileUrl: string) => void,
    lightDirection: Rotation;
    setLightDirection: (newRotation: Rotation) => void;
}

const ControlContextDefaultValues: ControlContext = {
    rotation: {
        polar: Math.PI/8,
        azimuth: Math.PI/4,
        speed: 0.01
    },
    setRotation: () => {},
    file: null,
    setFile: () => {},
    lightDirection: {
        polar: Math.PI/2,
        azimuth: Math.PI,
        speed: 1
    },
    setLightDirection: () => {}
}

const Context = React.createContext<ControlContext>(ControlContextDefaultValues);

const ControlContextProvider: React.FC = (props) => {
    const { children } = props;

    const [rotation, setRotation] = useState<Rotation>(ControlContextDefaultValues.rotation);
    const [file, setFile] = useState<string | null>(ControlContextDefaultValues.file);
    const [lightDirection, setLightDirection] = useState<Rotation>(ControlContextDefaultValues.rotation);

    const context = useMemo(() => {
       return {
           rotation,
           setRotation,
           file,
           setFile,
           lightDirection,
           setLightDirection
       }
    }, [rotation, file, lightDirection]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useControls = () => React.useContext(Context);

export { ControlContextProvider, useControls, Rotation };
