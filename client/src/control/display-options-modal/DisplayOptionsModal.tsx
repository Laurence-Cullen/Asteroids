import React from 'react';
import {Modal, ModalProps} from "../../framework/modal/Modal";
import {useControls} from "../control-context/ControlContext";

const DisplayOptionsModal: React.FC<ModalProps> = (props) => {
    const {
        drawGrid,
        setDrawGrid,
        drawVectors,
        setDrawVectors,
        drawBackground,
        setDrawBackground
    } = useControls();

    return (
        <Modal {...props}>
            <div>
                <label>
                    Draw grid
                    <input type="checkbox" checked={drawGrid} onChange={(e) => setDrawGrid(e.target.checked)} />
                </label>
            </div>
            <div>
                <label>
                    Draw vectors
                    <input type="checkbox" checked={drawVectors} onChange={(e) => setDrawVectors(e.target.checked)} />
                </label>
            </div>
            <div>
                <label>
                    Draw background
                    <input type="checkbox" checked={drawBackground} onChange={(e) => setDrawBackground(e.target.checked)} />
                </label>
            </div>
        </Modal>
    )
}

export { DisplayOptionsModal };
