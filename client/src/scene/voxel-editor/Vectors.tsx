import {LinePolar} from "../objects/line/LinePolar";
import {Line} from "../objects/line/Line";
import {CAMERA_POSITION} from "../objects/cassini/Cassini";
import React from "react";
import {Rotation} from "../../control/control-context/ControlContext";

type VectorsProps = {
    rotation: Rotation
    lightDirection: Rotation,
}

const Vectors: React.FC<VectorsProps> = ({rotation, lightDirection}) => (
    <>
        <LinePolar // Points at the sun
            start={[0, 0, 0]}
            length={1000}
            polarAngle={lightDirection.polar}
            azimuthAngle={lightDirection.azimuth}
            color={'orange'}
        />
        <LinePolar // Axis of rotation
            start={[0, 0, 0]}
            length={10}
            polarAngle={rotation.polar}
            azimuthAngle={rotation.azimuth}
            color={'red'}
        />
        <Line // Points at the camera
            start={[0, 0, 0]}
            end={CAMERA_POSITION}
            color={'yellow'}
        />
    </>
);

export { Vectors };
