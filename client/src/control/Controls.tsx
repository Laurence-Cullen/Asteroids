import React from "react";
import {Modal} from "../framework/modal/Modal";
import {SliderWithLabel} from "../framework/slider/SliderWithLabel";
import {useControls} from "./control-context/ControlContext";

const Controls: React.FC<{}> = () => {
    const {
        rotation,
        setRotation
    } = useControls();

    const [rotationX, rotationY] = rotation;

    return (
        <Modal
            title="Rotation"
            width={200}
            height={200}
        >
            <SliderWithLabel
                label="Rotation in X"
                min={-1}
                max={1}
                value={rotationX}
                onChange={(newX: number) => setRotation([newX, rotationY])}
            />
            <SliderWithLabel
                label="Rotation in Y"
                min={-1}
                max={1}
                value={rotationY}
                onChange={(newY: number) => setRotation([rotationX, newY])}
            />
        </Modal>
    );
}

export { Controls };
