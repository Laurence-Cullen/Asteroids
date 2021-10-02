import React, {MutableRefObject, useRef, useState} from "react";
import {ThreeEvent} from "@react-three/fiber";
import * as THREE from 'three';

type BoxProps = {
    position: [number, number, number],
    color?: string;
};

const Box: React.FC<BoxProps> = (props) => {
    const {
        position,
        color
    } = props;

    const ref: MutableRefObject<THREE.Mesh | null> = useRef(null)

    const [hovered, setHover] = useState(false)

    const toRender = color ? color : (
        hovered ? 'hotpink' : 'grey'
    );

    return (
        <mesh
            position={position}
            ref={ref}
            onClick={(event: ThreeEvent<MouseEvent>) => {
                console.log(event);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={toRender}
            />
        </mesh>
    )
}

export { Box };