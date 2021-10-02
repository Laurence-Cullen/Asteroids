import React, {MutableRefObject} from 'react';
import {useEffect, useRef} from "react";
import {extend, useFrame, useThree} from "@react-three/fiber";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, SSAOPass })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            effectComposer: any,
            shaderPass: any,
            renderPass: any,
            unrealBloomPass: any,
            sSAOPass: any
        }
    }
}

const Effects = () => {
    const composer: MutableRefObject<EffectComposer | null> = useRef(null)
    const { scene, gl, size, camera } = useThree()
    useEffect(() => {
        if (composer.current) {
            composer.current.setSize(size.width, size.height)
        }
    }, [size])
    useFrame(() => {
        if (composer.current) {
            composer.current?.render()
        }
    }, 1)

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <sSAOPass attachArray="passes" args={[scene, camera, 1024, 1024]} kernelRadius={0.8} maxDistance={0.4} />
            <unrealBloomPass attachArray="passes" args={[undefined, 1.6, 1, 0.5]} />
            <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
        </effectComposer>
    )
}

export { Effects };
