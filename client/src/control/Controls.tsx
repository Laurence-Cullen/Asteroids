import React from "react";
import {RotationModal} from "./rotation-modal/RotationModal";
import {FileUploadModal} from "./file-upload-modal/FileUploadModal";
import {useControls} from "./control-context/ControlContext";
import {DisplayOptionsModal} from "./display-options-modal/DisplayOptionsModal";
import {RenderLightVectorModal} from "./render-light-vector/RenderLightVectorModal";
import {CameraControlsModal} from "./camera-controls-modal/CameraControlsModal";
import {Modal} from "../framework/modal/Modal";

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
                height={100}
                initialPosition={[10, 200]}
                rotation={lightDirection}
                setRotation={setLightDirection}
            />
            <FileUploadModal
                title="Upload an STL file"
                width={200}
                height={100}
                initialPosition={[10, 340]}
            />
            <DisplayOptionsModal
                title="Display options"
                width={150}
                height={75}
                initialPosition={[10, 490]}
            />
            <CameraControlsModal
                title="Camera control"
                width={300}
                height={50}
                initialPosition={[10, 620]}
            />
            <RenderLightVectorModal />
            <Modal
                title="Info"
                width={300}
                height={50}
                initialPosition={[10, 720]}
            >
                Created by <a href={"https://2021.spaceappschallenge.org/challenges/statements/when-light-curves-throw-us-curve-balls/teams/cambridge-asteroids/project"}>Cambridge Asteroids</a>.
                View the code on <a href="https://github.com/Laurence-Cullen/Asteroids">Github</a>.
            </Modal>
        </>
    );
}

export { Controls };
