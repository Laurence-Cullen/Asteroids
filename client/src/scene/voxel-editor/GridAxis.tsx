import React from "react";
import {Line} from "../objects/line/Line";

const AXIS_SIZE = 1000;

const GridAxis: React.FC = () => {
    return (
        <>
        <Line
            start={[-AXIS_SIZE, 0, 0]}
            end={[AXIS_SIZE, 0, 0]}
            color="red"
        />
        <Line
            start={[0, -AXIS_SIZE, 0]}
            end={[0, AXIS_SIZE, 0]}
            color="green"
        />
        <Line
            start={[0, 0, -AXIS_SIZE]}
            end={[0, 0, AXIS_SIZE]}
            color="blue"
        />
        </>
    );
}

export { GridAxis };