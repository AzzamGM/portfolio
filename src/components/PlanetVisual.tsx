import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GLOBE_RADIUS = 1.65;
const ACCENT = '#00c45e';
const CORE = '#0e1711';
const AUTO_ROTATE_SPEED = 0.22;

function Globe({ interacting }: { interacting: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !interacting.current) {
      groupRef.current.rotation.y += delta * AUTO_ROTATE_SPEED;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 48, 48]} />
        <meshStandardMaterial
          color={CORE}
          emissive={ACCENT}
          emissiveIntensity={0.04}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[GLOBE_RADIUS, 3]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function PlanetVisual() {
  const interacting = useRef(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 4]} intensity={0.6} color={ACCENT} />
      <pointLight position={[-3, -1, -3]} intensity={0.25} color={ACCENT} />
      <Suspense fallback={null}>
        <Globe interacting={interacting} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        onStart={() => {
          interacting.current = true;
        }}
        onEnd={() => {
          interacting.current = false;
        }}
      />
    </Canvas>
  );
}
