"use client";

import { ContactShadows, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { type Group, MeshStandardMaterial, SRGBColorSpace, type Texture } from "three";

/* Kích thước sổ (đơn vị three): trang dọc theo trục Z, gáy nằm trên trục Z tại x = 0. */
const PAGE_W = 1.37;
const PAGE_H = 2;
const STACK = 0.12;
const COVER_T = 0.03;
const COVER_PAD = 0.05;
const GAP = 0.06;
const RINGS = 14;

const KRAFT = "#b9805a";
const PAPER = "#f1efea";

function useBookTextures() {
  const tex = useTexture({
    cover: "/book/tex-cover.jpg",
    left: "/book/tex-page-left.jpg",
    right: "/book/tex-page-right.jpg",
    edge: "/book/tex-edge.jpg",
  });
  for (const t of Object.values(tex)) t.colorSpace = SRGBColorSpace;
  return tex;
}

/* Thứ tự mặt của BoxGeometry: +x, -x, +y, -y, +z, -z. */
function stackMaterials(top: Texture, edge: Texture) {
  const side = new MeshStandardMaterial({ map: edge, roughness: 0.95 });
  return [
    side,
    side,
    new MeshStandardMaterial({ map: top, roughness: 0.9 }),
    new MeshStandardMaterial({ color: PAPER }),
    side,
    side,
  ];
}

function coverMaterials(cover: Texture) {
  const face = new MeshStandardMaterial({ map: cover, roughness: 1 });
  const rim = new MeshStandardMaterial({ color: KRAFT, roughness: 1 });
  return [rim, rim, face, face, rim, rim];
}

/* Một nửa sổ: bìa + khối giấy, xoay quanh gáy theo độ mở. */
function Half({ side, open, page }: { side: -1 | 1; open: number; page: Texture }) {
  const { cover, edge } = useBookTextures();
  const ref = useRef<Group>(null);
  const stackMats = useMemo(() => stackMaterials(page, edge), [page, edge]);
  const coverMats = useMemo(() => coverMaterials(cover), [cover]);

  useFrame(() => {
    // open = 1: mở phẳng; open = 0: gập lại (mỗi nửa dựng lên 90°).
    const target = side * (1 - open) * (Math.PI / 2);
    if (ref.current) ref.current.rotation.z += (target - ref.current.rotation.z) * 0.12;
  });

  return (
    <group ref={ref}>
      <mesh
        position={[side * (GAP + PAGE_W / 2 + COVER_PAD / 2), COVER_T / 2, 0]}
        material={coverMats}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[PAGE_W + COVER_PAD, COVER_T, PAGE_H + COVER_PAD * 2]} />
      </mesh>
      <mesh
        position={[side * (GAP + PAGE_W / 2), COVER_T + STACK / 2, 0]}
        material={stackMats}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[PAGE_W, STACK, PAGE_H]} />
      </mesh>
    </group>
  );
}

/* Lò xo: các vòng xuyến bọc qua gáy. */
function Spiral() {
  const step = (PAGE_H - 0.16) / (RINGS - 1);
  return (
    <group>
      {Array.from({ length: RINGS }, (_, i) => (
        <mesh key={i} position={[0, COVER_T + STACK * 0.55, -PAGE_H / 2 + 0.08 + i * step]} castShadow>
          <torusGeometry args={[0.085, 0.009, 12, 40]} />
          <meshStandardMaterial color="#2b2b2b" metalness={0.8} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function Notebook({ open }: { open: number }) {
  const { left, right } = useBookTextures();
  return (
    <group>
      <Half side={-1} open={open} page={left} />
      <Half side={1} open={open} page={right} />
      {/* Dải bìa nối hai nửa ở gáy, nằm dưới lò xo. */}
      <mesh position={[0, COVER_T / 2, 0]} receiveShadow>
        <boxGeometry args={[GAP * 2 + 0.02, COVER_T, PAGE_H + COVER_PAD * 2]} />
        <meshStandardMaterial color={KRAFT} roughness={1} />
      </mesh>
      <Spiral />
    </group>
  );
}

export function NotebookModel() {
  const [open, setOpen] = useState(1);

  return (
    <div className="relative h-svh w-full bg-[#0b1631]">
      <Canvas shadows camera={{ position: [0, 3.2, 3.4], fov: 40 }} dpr={[1, 2]}>
        <color attach="background" args={["#0b1631"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#9fc8ff" />
        <Suspense fallback={null}>
          <Notebook open={open} />
        </Suspense>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={7} blur={2.4} far={2} />
        <OrbitControls enablePan={false} minDistance={2.5} maxDistance={8} target={[0, 0, 0]} />
      </Canvas>

      <label className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white/90 px-6 py-3 text-sm text-[#111111]">
        Gập
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={open}
          onChange={(e) => setOpen(Number(e.target.value))}
          className="w-48 accent-[#111111]"
        />
        Mở
      </label>
    </div>
  );
}
