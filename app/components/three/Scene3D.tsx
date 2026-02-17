'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Float,
  Center,
  MeshTransmissionMaterial,
  Sparkles,
  useTexture,
  MeshDistortMaterial,
  Stars,
  Text
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

// Particle System Component
function ParticleField() {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [pos, vel];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Add velocity
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse interaction
      const dx = mouse.current.x * 10 - positions[i3];
      const dy = mouse.current.y * 10 - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positions[i3] -= dx * 0.02;
        positions[i3 + 1] -= dy * 0.02;
      }
      
      // Wrap around
      if (positions[i3] > 15) positions[i3] = -15;
      if (positions[i3] < -15) positions[i3] = 15;
      if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
      if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0005;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#d4af37"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Microphone Component
function Microphone() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });

  return (
    <group ref={group} position={[0, -1, 0]} scale={1.5}>
      {/* Mic head */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.8}
            distort={0.1}
            speed={2}
          />
        </mesh>
        {/* Mic grill pattern */}
        <mesh position={[0, 1.5, 0]} scale={1.01}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.8}
            metalness={0.2}
            wireframe
          />
        </mesh>
      </Float>
      
      {/* Mic body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.8, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
      
      {/* Mic stand connector */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={1}
        />
      </mesh>
      
      {/* Cable */}
      <mesh position={[0, -0.8, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

// 3D Text Component
function Title3D() {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!textRef.current) return;
    textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group ref={textRef} position={[0, 2, -3]}>
      <Center>
        <Text
          font="https://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqCfGZM.woff"
          fontSize={1.2}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          NICO
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.8}
            emissive="#d4af37"
            emissiveIntensity={0.3}
          />
        </Text>
      </Center>
      
      <Center position={[0, -1.2, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqCfGZM.woff"
          fontSize={0.9}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          HOFFMEISTER
          <meshStandardMaterial
            color="#a855f7"
            roughness={0.3}
            metalness={0.6}
            emissive="#a855f7"
            emissiveIntensity={0.2}
          />
        </Text>
      </Center>
    </group>
  );
}

// Floating Geometric Shapes
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10 - 5],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.5 + 0.3,
      color: i % 2 === 0 ? '#d4af37' : '#a855f7',
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <Float key={shape.id} speed={shape.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={shape.position as [number, number, number]} rotation={shape.rotation as [number, number, number]} scale={shape.scale}>
            {shape.id % 3 === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : shape.id % 3 === 1 ? (
              <octahedronGeometry args={[0.7]} />
            ) : (
              <torusGeometry args={[0.5, 0.2, 16, 32]} />
            )}
            <meshStandardMaterial
              color={shape.color}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Stage Spotlight
function StageLights() {
  const light1 = useRef<THREE.SpotLight>(null);
  const light2 = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (light1.current && light2.current) {
      light1.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
      light2.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 5;
    }
  });

  return (
    <>
      <spotLight
        ref={light1}
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={100}
        color="#d4af37"
        castShadow
      />
      <spotLight
        ref={light2}
        position={[-5, 10, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={100}
        color="#a855f7"
        castShadow
      />
      <ambientLight intensity={0.2} color="#1e1b4b" />
      <pointLight position={[0, 5, 0]} intensity={50} color="#fbbf24" />
    </>
  );
}

// Shader Background
function ShaderBackground() {
  const mesh = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;
    
    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = vUv;
      
      float noise1 = snoise(uv * 3.0 + uTime * 0.1);
      float noise2 = snoise(uv * 5.0 - uTime * 0.15);
      
      vec3 purple = vec3(0.18, 0.06, 0.4);
      vec3 gold = vec3(0.83, 0.69, 0.22);
      vec3 dark = vec3(0.04, 0.02, 0.07);
      
      float mixFactor = noise1 * 0.5 + 0.5;
      vec3 color = mix(dark, purple, mixFactor);
      color = mix(color, gold, noise2 * 0.3 + 0.1);
      
      // Mouse interaction
      float dist = distance(uv, uMouse);
      color += gold * 0.2 * smoothstep(0.5, 0.0, dist);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      uniforms.uMouse.value.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -10]} scale={[40, 30, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// Mouse Trail Particles
function MouseTrail() {
  const count = 100;
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef(new THREE.Vector3());
  const trailPositions = useRef(Float32Array.from({ length: count * 3 }, () => 0));
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 20 - 10;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 15 + 7.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    
    // Shift trail positions
    for (let i = count - 1; i > 0; i--) {
      trailPositions.current[i * 3] = trailPositions.current[(i - 1) * 3];
      trailPositions.current[i * 3 + 1] = trailPositions.current[(i - 1) * 3 + 1];
      trailPositions.current[i * 3 + 2] = trailPositions.current[(i - 1) * 3 + 2];
    }
    
    // Update first position to mouse
    trailPositions.current[0] = mousePos.current.x;
    trailPositions.current[1] = mousePos.current.y;
    trailPositions.current[2] = mousePos.current.z;
    
    // Update geometry
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count * 3; i++) {
      posArray[i] = trailPositions.current[i];
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        color="#fbbf24"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene Component
export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ShaderBackground />
          <ParticleField />
          <FloatingShapes />
          <StageLights />
          <Microphone />
          <MouseTrail />
          
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
            <ChromaticAberration offset={[0.002, 0.002]} />
            <DepthOfField
              focusDistance={0}
              focalLength={0.02}
              bokehScale={2}
              height={480}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
