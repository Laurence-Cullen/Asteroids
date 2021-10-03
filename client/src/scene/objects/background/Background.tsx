import React, {useLayoutEffect, useMemo} from "react";
import {CubeTexture, CubeTextureLoader} from "three";
import {useThree} from "@react-three/fiber";

const BACKGROUND_FILE_PATH = './shannon-stars.jpg';

type BackgroundProps = {
    drawBackground?: boolean
}

const Background: React.FC<BackgroundProps> = (props) => {
    const {
        scene
    } = useThree();

    const {
        drawBackground
    } = props;

    const cubeTexture: CubeTexture = useMemo(() => {
        return new CubeTextureLoader().load([
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH
        ]);
    }, []);

    useLayoutEffect(() => {
        if (drawBackground) {
            scene.background = cubeTexture;
        } else {
            scene.background = null;
        }
    }, [drawBackground]);

    return null;
}

export { Background };
