import React, {useMemo} from "react";
import * as THREE from 'three';
import { ReactThreeFiber, extend } from '@react-three/fiber'

extend({ Line_: THREE.Line })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
        }
    }
}

type LineComponentProps = {
    start: [number, number, number],
    end: [number, number, number],
    color: string
}

const Line: React.FC<LineComponentProps> = (props) => {
    const {
        start,
        end,
        color
    } = props;

    const geometry = useMemo(() =>
            new THREE.BufferGeometry().setFromPoints(
                [start, end].map((v) => new THREE.Vector3(...v))
            )
        , [start, end]
    )
    return (
        <line_ geometry={geometry}>
            <lineBasicMaterial color={color} />
        </line_>
    )
}

export { Line };
