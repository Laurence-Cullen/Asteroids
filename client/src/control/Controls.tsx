import React from "react";
import {RotationModal} from "./rotation-modal/RotationModal";
import {FileUploadModal} from "./file-upload-modal/FileUploadModal";
import {useControls} from "./control-context/ControlContext";

const Controls: React.FC<{}> = () => {
    const {
        rotation,
        setRotation,
        lightDirection,
        setLightDirection
    } = useControls();

    return (
        <>
            <RotationModal
                title="Rotate asteroid"
                width={300}
                height={150}
                initialPosition={[10, 10]}
                rotation={rotation}
                setRotation={setRotation}
                renderSpeedSlider
            />
            <RotationModal
                title="Light vector"
                width={300}
                height={150}
                initialPosition={[10, 200]}
                rotation={lightDirection}
                setRotation={setLightDirection}
            />
            <FileUploadModal
                title="Upload an STL file"
                width={200}
                height={75}
                initialPosition={[10, 300]}
            />
        </>
    );
}

export { Controls };
