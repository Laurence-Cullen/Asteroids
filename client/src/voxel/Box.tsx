import React, {MutableRefObject, useRef, useState} from "react";
import {MeshProps, ThreeEvent, useFrame} from "@react-three/fiber";

type BoxProps = {
    position: number[]
};

const Box: React.FC<BoxProps> = (props) => {
    const {
        position
    } = props;

    const ref: MutableRefObject<MeshProps | null> = useRef(null)

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => {
        if (ref.current !== null) {
            ref.current.rotation.x += 0.01
        }
    })

    return (
        <mesh
            position={position}
            ref={ref}
            scale={active ? 1.5 : 1}
            onClick={(event: ThreeEvent<MouseEvent>) => {
                setActive(!active);
                console.log(event);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export { Box };