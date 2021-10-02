import React from "react";

type SphereProps = {
    position: [number, number, number],
    color?: string;
    size?: number;
};

const Sphere: React.FC<SphereProps> = (props) => {
    const {
        position,
        color,
        size
    } = props;

    return (
        <mesh
            position={position}
        >
            <sphereBufferGeometry args={[size ? size : 1]} />
            <meshToonMaterial
                color={color ? color : 'white'}
            />
        </mesh>
    )
}

export { Sphere };