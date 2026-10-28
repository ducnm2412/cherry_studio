"use client";

import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useRef } from "react";
import type { Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  { title: "Khoảnh khắc", text: "Mỗi tháng thai kỳ là một hình hài mới." },
  { title: "Ánh sáng", text: "Ánh sáng studio ôm lấy từng đường cong." },
  { title: "Kỷ niệm", text: "Ảnh in ra, giữ lại cho con sau này." },
];

/* progress: 0 → 1 theo cuộn, đọc trong useFrame để không re-render React. */
function Cherry({ progress }: { progress: RefObject<number> }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    g.rotation.y = p * Math.PI * 2 + state.clock.elapsedTime * 0.15;
    g.rotation.x = Math.sin(p * Math.PI) * 0.5;
    g.position.x = gsap.utils.interpolate(1.6, -1.6, p);
    state.camera.position.z = gsap.utils.interpolate(7, 4.5, Math.sin(p * Math.PI));
    state.camera.lookAt(0, 0, 0);
    g.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.25);
  });

  return (
    <group ref={group}>
      <mesh position={[-0.55, -0.6, 0]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial color="#7a1e2c" roughness={0.25} metalness={0.1} />
      </mesh>
      <mesh position={[0.65, -0.8, 0.2]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial color="#7a1e2c" roughness={0.25} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.1]}>
        <torusGeometry args={[1.1, 0.05, 16, 64, Math.PI * 0.6]} />
        <meshStandardMaterial color="#3d4a2a" />
      </mesh>
    </group>
  );
}

export function Scroll3D() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              progress.current = self.progress;
            },
          },
        });
        gsap.utils.toArray<HTMLElement>(".chapter").forEach((el, i) => {
          tl.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 }, i * 2);
          if (i < chapters.length - 1) tl.to(el, { autoAlpha: 0, y: -40 }, i * 2 + 1.5);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-mist">
      <Canvas className="!absolute inset-0" camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <Cherry progress={progress} />
      </Canvas>
      <div className="pointer-events-none relative mx-auto grid h-full max-w-7xl items-center px-4 md:px-8">
        {chapters.map((c) => (
          <div key={c.title} className="chapter col-start-1 row-start-1 max-w-sm">
            <h2 className="font-serif text-4xl md:text-6xl">{c.title}</h2>
            <p className="mt-4 text-graphite">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
