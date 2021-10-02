import React from "react";
import {Slider, SliderProps} from "./Slider";

import "./SliderWithLabel.scss";

type SliderWithLabelProps = {
    label: string;
    displayValue?: boolean
} & SliderProps;

const SliderWithLabel: React.FC<SliderWithLabelProps> = (props) => {
    const {
        label,
        displayValue,
        ...passThroughProps
    } = props;

    const {
        value
    } = passThroughProps;

    return (
        <label className="slider-with-label">
            <div className="slider-label">
                {label}
            </div>
            <div className="slider-container">
                <div className="slider">
                    <Slider {...passThroughProps} />
                </div>
                {displayValue &&
                    <div className="slider-value">
                        {value}
                    </div>
                }
            </div>
        </label>
    )
}

export { SliderWithLabel }