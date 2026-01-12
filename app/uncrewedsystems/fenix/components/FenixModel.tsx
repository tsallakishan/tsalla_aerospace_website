"use client"
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function FenixModel(props: any) {
  const { nodes, materials } = useGLTF('/model/fenix.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.463, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023_1.geometry}
          material={materials.Body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023_2.geometry}
          material={materials['Body Logo']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials['Metal Parts']}
          position={[0, -0.036, -0.001]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={materials['Metal Parts']}
          position={[0, 0.017, -0.219]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          material={materials['Metal Parts']}
          position={[0, -0.041, 0.228]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials['Metal Parts']}
            position={[0, -0.023, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder014.geometry}
              material={materials['Metal Parts']}
              position={[0, -0.005, 0.003]}>
              <group position={[0, 0, 0.007]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube026.geometry}
                  material={materials.Camera}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube026_1.geometry}
                  material={materials['Camera Logo']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017.geometry}
                  material={materials.Camera}
                  position={[0.014, 0, 0.021]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder018.geometry}
                  material={materials.Glass}
                  position={[0.014, 0, 0.026]}
                />
                <group position={[0.014, 0, 0.021]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_1.geometry}
                    material={materials['Camera Lens Black']}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_2.geometry}
                    material={materials['Camera lens glass']}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_3.geometry}
                    material={materials['Black Camera']}
                  />
                </group>
              </group>
            </mesh>
          </mesh>
        </mesh>
        <group position={[0, -0.014, -0.158]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials.Battery}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials['Battery Logo']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['Metal Parts']}
          position={[0, -0.042, -0.015]}
        />
        <group position={[-0.372, -0.005, 0.255]} rotation={[0, -1.513, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003_1.geometry}
            material={materials.Blades}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003_2.geometry}
            material={materials['Blades White']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials.Nuts}
          position={[0, -0.039, -0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={materials.Motor}
          position={[0, -0.021, -0.015]}
        />
        <group position={[0.372, -0.005, -0.285]} rotation={[0, -1.513, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_1.geometry}
            material={materials.Blades}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_2.geometry}
            material={materials['Blades White']}
          />
        </group>
        <group position={[-0.372, -0.005, -0.285]} rotation={[0, -1.513, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder012.geometry}
            material={materials.Blades}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder012_1.geometry}
            material={materials['Blades White']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder008.geometry}
          material={materials.Stand}
          position={[0, -0.067, -0.03]}
        />
        <group position={[0.372, -0.005, 0.255]} rotation={[0, -1.513, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder027.geometry}
            material={materials.Blades}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder027_1.geometry}
            material={materials['Blades White']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder010.geometry}
          material={materials['Fan Guard']}
          position={[0, -0.016, -0.015]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/model/fenix.glb')
