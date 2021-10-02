import React from "react";
import {Modal} from "../../framework/modal/Modal";
import {SliderWithLabel} from "../../framework/slider/SliderWithLabel";
import {useControls} from "../control-context/ControlContext";

const ROTATION_STEP = 0.1;

const RotationModal: React.FC<{}> = () => {
    const {
        rotation,
        setRotation
    } = useControls();

    const {
        polar,
        azimuth,
        speed
    } = rotation;

    return (
        <Modal
            title="Rotation"
            width={200}
            height={200}
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
            <SliderWithLabel
                label="Speed"
                min={0}
                max={Math.PI/2}
                value={speed}
                step={ROTATION_STEP}
                onChange={(newSpeed: number) => setRotation({
                    polar,
                    azimuth,
                    speed: newSpeed
                })}
                displayValue
            />
        </Modal>
    );
}

export { RotationModal };
