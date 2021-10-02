import React from "react";
import {Modal} from "../../framework/modal/Modal";
import {SliderWithLabel} from "../../framework/slider/SliderWithLabel";
import {useControls} from "../control-context/ControlContext";

const ROTATION_RANGE = 0.25;
const ROTATION_MIN = -1 * ROTATION_RANGE;
const ROTATION_MAX = ROTATION_RANGE;
const ROTATION_STEP = 0.01;

const RotationModal: React.FC<{}> = () => {
    const {
        rotation,
        setRotation
    } = useControls();

    const [rotationX, rotationY, rotationZ] = rotation;

    return (
        <Modal
            title="Rotation"
            width={200}
            height={200}
        >
            <SliderWithLabel
                label="Rotation in X"
                min={ROTATION_MIN}
                max={ROTATION_MAX}
                value={rotationX}
                step={ROTATION_STEP}
                onChange={(newX: number) => setRotation([newX, rotationY, rotationZ])}
                displayValue
            />
            <SliderWithLabel
                label="Rotation in Y"
                min={ROTATION_MIN}
                max={ROTATION_MAX}
                value={rotationY}
                step={ROTATION_STEP}
                onChange={(newY: number) => setRotation([rotationX, newY, rotationZ])}
                displayValue
            />
            <SliderWithLabel
                label="Rotation in Z"
                min={ROTATION_MIN}
                max={ROTATION_MAX}
                value={rotationZ}
                step={ROTATION_STEP}
                onChange={(newZ: number) => setRotation([rotationX, rotationY, newZ])}
                displayValue
            />
        </Modal>
    );
}

export { RotationModal };
