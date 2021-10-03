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
    drawGrid: boolean;
    setDrawGrid: (val: boolean) => void;
    drawVectors: boolean;
    setDrawVectors: (val: boolean) => void;
    drawBackground: boolean;
    setDrawBackground: (val: boolean) => void;
}

const ControlContextDefaultValues: ControlContext = {
    rotation: {
        polar: Math.random() * Math.PI,
        azimuth: Math.random() * Math.PI * 2,
        speed: 0.01
    },
    setRotation: () => {},
    file: './216kleopatra.stl',
    setFile: () => {},
    lightDirection: {
        polar: Math.PI/8,
        azimuth: Math.PI/4,
        speed: 1
    },
    setLightDirection: () => {},
    drawGrid: false,
    setDrawGrid: () => {},
    drawVectors: false,
    setDrawVectors: () => {},
    drawBackground: true,
    setDrawBackground: () => {}
}

const Context = React.createContext<ControlContext>(ControlContextDefaultValues);

const ControlContextProvider: React.FC = (props) => {
    const { children } = props;

    const [rotation, setRotation] = useState<Rotation>(ControlContextDefaultValues.rotation);
    const [file, setFile] = useState<string | null>(ControlContextDefaultValues.file);
    const [lightDirection, setLightDirection] = useState<Rotation>(ControlContextDefaultValues.lightDirection);
    const [drawGrid, setDrawGrid] = useState<boolean>(ControlContextDefaultValues.drawGrid);
    const [drawVectors, setDrawVectors] = useState<boolean>(ControlContextDefaultValues.drawVectors);
    const [drawBackground, setDrawBackground] = useState<boolean>(ControlContextDefaultValues.drawBackground);

    const context = useMemo(() => {
       return {
           rotation,
           setRotation,
           file,
           setFile,
           lightDirection,
           setLightDirection,
           drawGrid,
           setDrawGrid,
           drawVectors,
           setDrawVectors,
           drawBackground,
           setDrawBackground
       }
    }, [rotation, file, lightDirection, drawGrid, drawVectors, drawBackground]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useControls = () => React.useContext(Context);

export { ControlContextProvider, useControls, Rotation };
