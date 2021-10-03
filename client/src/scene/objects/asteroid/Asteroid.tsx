import {RotatingGroup} from "../../construct/rotating-group/RotatingGroup";
import React, {Suspense} from "react";
import {Box} from "../box/Box";
import {ModelLoader} from "../../model-loader/ModelLoader";
import {VoxelEditor} from "../../voxel-editor/VoxelEditor";
import {Rotation} from "../../../control/control-context/ControlContext";

type AsteroidProps = {
    file: string | null;
    rotation: Rotation;
}

const Asteroid: React.FC<AsteroidProps> = (props) => {
    const {
        rotation,
        file
    } = props;

    return (
        <RotatingGroup rotation={rotation}>
            <Suspense fallback={<Box position={[0, 0, 0]} />}>
                {file ? <ModelLoader filename={file}/> : <VoxelEditor /> }
            </Suspense>
        </RotatingGroup>
    )
}

export { Asteroid };
