import React from "react";
import {Modal, ModalProps} from "../../framework/modal/Modal";
import {SliderWithLabel} from "../../framework/slider/SliderWithLabel";
import {Rotation} from "../control-context/ControlContext";

const ROTATION_STEP = 0.1;

type RotationModalProps = {
    rotation: Rotation,
    setRotation: (newRotation: Rotation) => void;
    renderSpeedSlider?: boolean
} & ModalProps;

const RotationModal: React.FC<RotationModalProps> = (props) => {
    const {
        rotation,
        setRotation,
        renderSpeedSlider,
        ...modalProps
    } = props;

    const {
        polar,
        azimuth,
        speed
    } = rotation;

    return (
        <Modal
            {...modalProps}
        >
            <SliderWithLabel
                label="Polar angle"
                min={0}
                max={Math.PI}
                value={polar}
                step={ROTATION_STEP}
                onChange={(newPolar: number) => setRotation({
                    polar: newPolar,
                    azimuth,
                    speed
                })}
                displayValue
            />
            <SliderWithLabel
                label="Azimuth angle"
                min={0}
                max={2 * Math.PI}
                value={azimuth}
                step={ROTATION_STEP}
                onChange={(newAz: number) => setRotation({
                    polar,
                    azimuth: newAz,
                    speed
                })}
                displayValue
            />
            {renderSpeedSlider &&
                <SliderWithLabel
                    label="Speed"
                    min={0}
                    max={1}
                    value={speed}
                    step={0.01}
                    onChange={(newSpeed: number) => setRotation({
                        polar,
                        azimuth,
                        speed: newSpeed
                    })}
                    displayValue
                />
            }
        </Modal>
    );
}

export { RotationModal };
