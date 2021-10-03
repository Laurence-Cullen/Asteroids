import React, {useLayoutEffect} from "react";
import {CubeTextureLoader} from "three";
import {useThree} from "@react-three/fiber";

const BACKGROUND_FILE_PATH = './shannon-stars.jpg';

const Background: React.FC<{}> = () => {
    const {
        scene
    } = useThree();

    useLayoutEffect(() => {
        const loader = new CubeTextureLoader();
        scene.background = loader.load([
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH,
            BACKGROUND_FILE_PATH
        ]);
    }, []);

    return null;
}

export { Background };
