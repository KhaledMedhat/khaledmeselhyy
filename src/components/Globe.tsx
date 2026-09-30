"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = new THREE.Color("#d4b483");
const IVORY = new THREE.Color("#ece8e1");
const SEGMENTS = 160;

type Ring = { line: THREE.Line; delay: number };

/** A ring of radius r, tilted so its normal is `axis`, lifted by `offset` along that axis. */
function ring(r: number, color: THREE.Color, opacity: number, rotate: (o: THREE.Object3D) => void, dashed = false) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const a = (i / SEGMENTS) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = dashed
    ? new THREE.LineDashedMaterial({ color, transparent: true, opacity, dashSize: 0.04, gapSize: 0.05 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  const line = new THREE.Line(geo, mat);
  if (dashed) line.computeLineDistances();
  rotate(line);
  geo.setDrawRange(0, 0);
  return line;
}

function Armillary({ still }: { still: boolean }) {
  const sphere = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const t0 = useRef<number | null>(null);

  const { sphereRings, outerRings, group, outerGroup } = useMemo(() => {
    const R = 1;
    const sphereRings: Ring[] = [];
    // Meridians
    for (let i = 0; i < 6; i++) {
      sphereRings.push({
        line: ring(R, ACCENT, i % 3 === 0 ? 0.6 : 0.42, (o) => o.rotateY((i * Math.PI) / 6)),
        delay: i * 0.12,
      });
    }
    // Parallels
    [0, 0.5, -0.5, 0.86, -0.86].forEach((y, i) => {
      const r = Math.sqrt(1 - y * y) * R;
      sphereRings.push({
        line: ring(r, IVORY, i === 0 ? 0.35 : i < 3 ? 0.22 : 0.14, (o) => {
          o.rotateX(Math.PI / 2);
          o.position.y = y * R;
        }),
        delay: 0.7 + i * 0.12,
      });
    });
    const outerRings: Ring[] = [{ line: ring(1.28, IVORY, 0.3, () => {}, true), delay: 1.2 }];

    const group = new THREE.Group();
    sphereRings.forEach((r) => group.add(r.line));
    const outerGroup = new THREE.Group();
    outerRings.forEach((r) => outerGroup.add(r.line));
    return { sphereRings, outerRings, group, outerGroup };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, dt) => {
    if (t0.current === null) t0.current = clock.elapsedTime;
    const t = clock.elapsedTime - t0.current;

    // Draw each ring in, staggered, with an ease-in-out.
    for (const r of [...sphereRings, ...outerRings]) {
      const p = still ? 1 : THREE.MathUtils.clamp((t - r.delay) / 1.8, 0, 1);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      r.line.geometry.setDrawRange(0, Math.ceil(eased * (SEGMENTS + 1)));
    }

    if (!sphere.current || !outer.current) return;
    if (!still) {
      sphere.current.rotation.y += dt * 0.22;
      outer.current.rotation.z -= dt * 0.08;
    }
    // Gentle parallax toward the pointer.
    const tx = -0.28 + pointer.current.y * 0.12;
    const tz = 0.14 + pointer.current.x * -0.1;
    sphere.current.rotation.x += (tx - sphere.current.rotation.x) * 0.04;
    sphere.current.rotation.z += (tz - sphere.current.rotation.z) * 0.04;
  });

  return (
    <>
      <group ref={sphere}>
        <primitive object={group} />
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
        </mesh>
      </group>
      <group ref={outer} rotation={[1.1, 0, 0]}>
        <primitive object={outerGroup} />
        <mesh position={[0, 1.28, 0]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshBasicMaterial color={IVORY} />
        </mesh>
      </group>
    </>
  );
}

export default function Globe() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 3.4], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Armillary still={still} />
    </Canvas>
  );
}
