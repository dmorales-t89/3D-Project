import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import { HQSky } from './Assets/HQSky.jsx'
import { Space } from './Assets/Space.jsx'
import { HQForest } from './Assets/HQForest.jsx'
import { ScrollControls, useScroll } from '@react-three/drei'  
import gsap from 'gsap'
import { Overlay } from './Overlay.jsx'


const RotatingSky = () => {
    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.001
    })
    return <HQSky ref={ref} />
}

const RotatingForest = () => {
    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.001
    })
    return <HQForest scale={0.085} position={[200, 0, 0]} ref={ref} />
}
    

const CameraAnimation = () => {
    const { camera } = useThree();
    const scroll = useScroll();
    const tl = useRef();

    useEffect(() => {
        tl.current = gsap.timeline();

        tl.current.to(camera.position, { x: -300, z: 100, duration: 20  });
        tl.current.to(camera.position, { x: 0, z: -10, duration: 60 });
        tl.current.to(camera.position, { x: 200, z: 0, duration: 60 });
        
    }, [camera]);

    useFrame(() => {
        if (tl.current) {
            tl.current.progress(scroll.offset)
        }
    })
}

const RotatingSpace = () => {
    const ref = useRef()
    const scroll = useScroll()

    useFrame(() => {
        if (!ref.current) return
        ref.current.rotation.x = scroll.offset * Math.PI * 2
    })
    return (
        <group ref={ref}>
            <Space scale={50} position={[-300, -70, 40]} />
        </group>
    )
}

const App = () => {

        
  return (
      <Canvas camera = {{ position: [0, 0, 300]}}>
        
        
        <ambientLight intensity={0.1} />
        
        <Suspense fallback={null}>
            <ScrollControls pages={3} damping = {0.5} style={{ background: 'transparent' }}>
                <Overlay />
                <CameraAnimation />
                <RotatingSky />
                <RotatingSpace/>
                <RotatingForest  />   
            </ScrollControls>
        </Suspense>
      </Canvas>
  )
}

export default App
