import {Modal, ModalProps} from "../../framework/modal/Modal";
import React from "react";
import {useControls} from "../control-context/ControlContext";

import "./CameraControlsModal.scss";

const CameraControlsModal: React.FC<ModalProps> = (props) => {
    const {
        title,
        ...passThroughProps
    } = props;

    const { fixCamera, setFixCamera } = useControls()

    const handleClick = () => setFixCamera(!fixCamera);

    return (
        <Modal {...passThroughProps} title={`${title}: ${fixCamera ? 'Sat view' : 'Free look'}`}>
            <button onClick={handleClick} className="camera-controls-modal-button">
                { fixCamera ? 'Change to free look' : 'Change to Satellite view' }
            </button>
        </Modal>
    )
}

export { CameraControlsModal };