import React, {useMemo, useState} from "react";

type ControlContext = {
    rotation: [number, number];
    setRotation: (newRotation: [number, number]) => void;
}

const ControlContextDefaultValues: ControlContext = {
    rotation: [0, 0],
    setRotation: () => {}
}

const Context = React.createContext<ControlContext>(ControlContextDefaultValues);

const ControlContextProvider: React.FC = (props) => {
    const { children } = props;

    const [rotation, setRotation] = useState<[number, number]>(ControlContextDefaultValues.rotation);

   const context = useMemo(() => {
       return {
           rotation,
           setRotation
       }
    }, [rotation]);

    return (<Context.Provider value={context}>{children}</Context.Provider>)
};

const useControls = () => React.useContext(Context);

export { ControlContextProvider, useControls };
