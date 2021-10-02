import React from 'react';

type SliderProps = {
    onChange?: (newValue: number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const Slider: React.FC<SliderProps> = (props) => {
    const {
        onChange,
        ...passThroughProps
    } = props;

    return (

        <input
            {...passThroughProps}
            type="range"
            onChange={(e) => {
                if (onChange) {
                    onChange(Number(e.target.value))
                }
            }}
        />
    );
}

export { Slider, SliderProps };
