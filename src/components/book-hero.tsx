"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { type ReactNode, useRef } from "react";
import {
  behindTheScenes,
  type Concept,
  concepts,
  studio,
  tel,
} from "@/data/concepts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Ảnh concept xếp theo khung mẫu của studio: slug, ảnh thứ mấy, vị trí % màn hình, góc nghiêng, độ rộng (vw). */
const floating = [
  { slug: "tone-tim", n: 0, left: 4.5, top: 26, rotate: 0, width: 10 },
  { slug: "chup-voi-ngua", n: 0, left: 15.5, top: 19, rotate: 0, width: 10 },
  { slug: "cao-boi", n: 0, left: 29.6, top: 35, rotate: 0, width: 10 },
  {
    slug: "a-from-girl-a-to-mom",
    n: 0,
    left: 45.5,
    top: 46,
    rotate: 0,
    width: 10,
  },
  { slug: "quy-toc", n: 0, left: 58, top: 35, rotate: 0, width: 10 },
  { slug: "tone-hong", n: 0, left: 72.3, top: 22, rotate: 0, width: 10 },
  { slug: "true-love-grows", n: 0, left: 85.3, top: 33, rotate: 0, width: 10 },
].flatMap((s) => {
  const c = concepts.find((x) => x.slug === s.slug);
  const photo = c?.photos[s.n] ?? c?.photos[0];
  return c && photo ? [{ ...s, name: c.name, photo }] : [];
});

const tapes = ["#cfcfcf", "#e5e5e5", "#e0e0e0", "#a3a3a3"];

/* Icon dễ thương rải trên nền: loại, vị trí %, kích thước px. */
const icons = [
  { kind: "cherry", left: 3, top: 6, size: 44 },
  { kind: "heart", left: 28, top: 4, size: 26 },
  { kind: "star", left: 52, top: 3, size: 22 },
  { kind: "flower", left: 92, top: 8, size: 38 },
  { kind: "cloud", left: 70, top: 4, size: 54 },
  { kind: "heart", left: 96, top: 44, size: 30 },
  { kind: "star", left: 1, top: 38, size: 28 },
  { kind: "flower", left: 20, top: 70, size: 34 },
  { kind: "cherry", left: 90, top: 74, size: 46 },
  { kind: "sparkle", left: 38, top: 40, size: 24 },
  { kind: "sparkle", left: 60, top: 46, size: 20 },
  { kind: "heart", left: 5, top: 82, size: 34 },
  { kind: "cloud", left: 12, top: 30, size: 46 },
  { kind: "star", left: 78, top: 88, size: 26 },
  { kind: "flower", left: 74, top: 62, size: 26 },
  { kind: "sparkle", left: 84, top: 40, size: 26 },
] as const;

function Icon({ kind }: { kind: (typeof icons)[number]["kind"] }) {
  switch (kind) {
    case "heart":
      return (
        <path
          d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 4.5 6.8 4.5c2.1 0 3.5 1.2 5.2 3.1 1.7-1.9 3.1-3.1 5.2-3.1 3.6 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z"
          fill="#2a2a2a"
        />
      );
    case "star":
      return (
        <path
          d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.8z"
          fill="#ffffff"
          stroke="#1a1a1a"
          strokeLinejoin="round"
        />
      );
    case "sparkle":
      return (
        <path
          d="M12 1c.8 5.6 2.4 7.6 9 9-6.6 1.4-8.2 3.4-9 9-.8-5.6-2.4-7.6-9-9 6.6-1.4 8.2-3.4 9-9z"
          fill="#8a8a8a"
        />
      );
    case "cloud":
      return (
        <path
          d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5 4.8 4.8 0 0 1 18 18z"
          fill="#ffffff"
          stroke="#bdbdbd"
          strokeWidth="1"
        />
      );
    case "flower":
      return (
        <g>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="12"
              cy="6.5"
              rx="3.6"
              ry="5"
              fill="#cfcfcf"
              transform={`rotate(${a} 12 12)`}
            />
          ))}
          <circle cx="12" cy="12" r="3" fill="#e5e5e5" />
        </g>
      );
    case "cherry":
      return (
        <g>
          <path
            d="M8 15 C9 9 12 5 17 3 M16 15 C15.5 10 16 6 17 3"
            stroke="#555555"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M17 3 c2 -1 4 0 4.5 1.5 -2 .8 -3.6.4 -4.5 -1.5z"
            fill="#9a9a9a"
          />
          <circle cx="7.5" cy="17" r="4.5" fill="#111111" />
          <circle cx="16" cy="17.5" r="4.2" fill="#2b2b2b" />
          <circle cx="6" cy="15.5" r="1.1" fill="#fff" opacity="0.7" />
          <circle cx="14.6" cy="16" r="1" fill="#fff" opacity="0.7" />
        </g>
      );
  }
}

/* Nền trời sao: các lớp chấm sáng lặp theo ô lệch kích thước, trên dải xanh đêm. */
const skyStyle = {
  backgroundImage: [
    "radial-gradient(0.7px 0.7px at 82px 38px, #ffffff, transparent)",
    "radial-gradient(0.5px 0.5px at 18px 137px, #ffffff, transparent)",
    "radial-gradient(0.5px 0.5px at 129px 54px, #cfe3ff, transparent)",
    "radial-gradient(0.6px 0.6px at 107px 17px, #cfe3ff, transparent)",
    "radial-gradient(0.6px 0.6px at 15px 144px, #ffffff, transparent)",
    "radial-gradient(0.8px 0.8px at 161px 160px, #ffffff, transparent)",
    "radial-gradient(0.7px 0.7px at 147px 149px, #ffffff, transparent)",
    "radial-gradient(0.9px 0.9px at 11px 142px, #cfe3ff, transparent)",
    "radial-gradient(0.8px 0.8px at 107px 36px, #cfe3ff, transparent)",
    "radial-gradient(0.6px 0.6px at 143px 46px, #ffffff, transparent)",
    "radial-gradient(0.8px 0.8px at 95px 24px, #ffffff, transparent)",
    "radial-gradient(0.8px 0.8px at 144px 15px, #cfe3ff, transparent)",
    "radial-gradient(0.9px 0.9px at 136px 109px, #cfe3ff, transparent)",
    "radial-gradient(0.7px 0.7px at 149px 116px, #ffffff, transparent)",
    "radial-gradient(0.6px 0.6px at 92px 124px, #bcd8ff, transparent)",
    "radial-gradient(1.4px 1.4px at 268px 253px, #ffe9a8, transparent)",
    "radial-gradient(1.1px 1.1px at 229px 147px, #ffffff, transparent)",
    "radial-gradient(0.9px 0.9px at 60px 262px, #bcd8ff, transparent)",
    "radial-gradient(0.9px 0.9px at 77px 250px, #ffe9a8, transparent)",
    "radial-gradient(1.1px 1.1px at 39px 285px, #bcd8ff, transparent)",
    "radial-gradient(1.1px 1.1px at 174px 179px, #ffe9a8, transparent)",
    "radial-gradient(1.3px 1.3px at 233px 35px, #bcd8ff, transparent)",
    "radial-gradient(0.6px 0.6px at 242px 33px, #ffe9a8, transparent)",
    "radial-gradient(1.5px 1.5px at 158px 295px, #bcd8ff, transparent)",
    "radial-gradient(1.4px 1.4px at 145px 197px, #bcd8ff, transparent)",
    "radial-gradient(0.9px 0.9px at 11px 236px, #ffe9a8, transparent)",
    "radial-gradient(0.6px 0.6px at 59px 252px, #9fe8ff, transparent)",
    "radial-gradient(0.9px 0.9px at 66px 378px, #9fe8ff, transparent)",
    "radial-gradient(0.6px 0.6px at 446px 254px, #9fe8ff, transparent)",
    "radial-gradient(1.0px 1.0px at 205px 281px, #ffffff, transparent)",
    "radial-gradient(2.0px 2.0px at 419px 220px, #9fe8ff, transparent)",
    "radial-gradient(2.2px 2.2px at 361px 212px, #ffd27a, transparent)",
    "radial-gradient(2.1px 2.1px at 452px 194px, #ffffff, transparent)",
    "radial-gradient(0.8px 0.8px at 42px 90px, #ffd27a, transparent)",
    "linear-gradient(to bottom, #020616 0%, #071643 40%, #0f3a7a 75%, #1d5fa8 100%)",
  ].join(","),
  backgroundSize: [
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "173px 173px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "311px 311px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "457px 457px",
    "100% 100%",
  ].join(","),
};

/* Mỗi lần lật mở ra một concept: ảnh bìa bên trái, tên và mô tả bên phải. */
const flipped = concepts.filter((c) => c.photos.length > 0);

function ConceptCover({ concept, index }: { concept: Concept; index: number }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.3em] text-[#6b6b6b]">
        02 · CONCEPT {String(index + 1).padStart(2, "0")}/
        {String(flipped.length).padStart(2, "0")}
      </p>
      <div className="relative mt-[4%] flex-1 bg-mist">
        <Image
          src={concept.photos[0].src}
          alt={concept.name}
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>
      <p className="mt-[3%] font-serif text-[clamp(0.55rem,0.9vw,0.8rem)] italic text-[#6b6b6b]">
        {concept.caption}
      </p>
    </div>
  );
}

function ConceptInfo({ concept, index }: { concept: Concept; index: number }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.3em] text-[#6b6b6b]">
        MỖI MẸ MỘT CÂU CHUYỆN
      </p>
      <h2 className="mt-[4%] font-serif text-[clamp(1.2rem,3vw,2.8rem)] font-extralight leading-tight text-[#111111]">
        {concept.name}
      </h2>
      <p className="mt-[2%] font-serif text-[clamp(0.7rem,1.2vw,1.1rem)] italic text-[#6b6b6b]">
        {concept.caption}
      </p>
      <p className="mt-[6%] max-w-[34ch] text-[clamp(0.6rem,1vw,0.95rem)] leading-relaxed text-[#3a3a3a]">
        {concept.description}
      </p>
      <ul className="mt-[5%] flex flex-wrap gap-2">
        {concept.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-[#3a3a3a]/30 px-3 py-1 text-[clamp(0.55rem,0.85vw,0.8rem)] text-[#3a3a3a]"
          >
            {t}
          </li>
        ))}
      </ul>
      {/* Vài ảnh khác trong album, dán nghiêng như ảnh polaroid. */}
      <div className="my-[5%] grid min-h-0 flex-1 grid-cols-3 gap-[4%]">
        {concept.photos.slice(1, 4).map((ph, k) => (
          <div
            key={ph.src}
            className="relative bg-white p-[5%] pb-[12%] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)]"
            style={{ rotate: `${[-3, 2, -1.5][k]}deg` }}
          >
            <div className="relative h-full bg-mist">
              <Image
                src={ph.src}
                alt={`${concept.name} ${k + 2}`}
                fill
                sizes="12vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <a
          href={tel(studio.hotlines[0])}
          className="bg-[#111111] px-[5%] py-[2.5%] text-[clamp(0.6rem,1vw,0.9rem)] font-medium text-white hover:bg-graphite"
        >
          Đặt concept này
        </a>
        <span className="font-serif text-[clamp(0.7rem,1.1vw,1rem)] italic text-[#9a9a9a]">
          {index + 1} / {flipped.length}
        </span>
      </div>
    </div>
  );
}

/* Trang phục (sau khi sổ gập): mỗi concept một bộ (ảnh thứ 5 nếu có), cùng ảnh hậu trường. */
const outfits = flipped.flatMap((c) => {
  const photo = c.photos[4] ?? c.photos[c.photos.length - 1];
  return photo ? [{ src: photo.src, label: c.name }] : [];
});
const backstage = behindTheScenes.map((p) => ({
  src: p.src,
  label: "Hậu trường",
}));

/* 04 · Quy trình: bốn bước viết như danh sách việc trong sổ, đánh dấu dần khi cuộn. */
const processSteps = [
  { title: "Gọi hoặc nhắn tin", text: "Mẹ chọn ngày, Cherry giữ lịch cho mẹ." },
  { title: "Chọn concept", text: "Cùng thử trang phục, phụ kiện có sẵn ở studio." },
  { title: "Chụp", text: "Ê-kíp chỉ dáng từng chút, mẹ mệt thì nghỉ." },
  { title: "Nhận ảnh", text: "Ảnh chỉnh kỹ, gửi lại cho mẹ giữ mãi." },
];

/* 05 · Cảm nhận: câu trích MẪU, chờ studio gửi feedback thật của khách. */
const reviews = [
  { name: "Chị Lan", note: "bầu 7 tháng", text: "Mình ngại tạo dáng lắm, nhưng ê-kíp chỉ từng chút một. Ảnh ra ai cũng khen." },
  { name: "Chị Hà", note: "chụp cùng chồng", text: "Váy áo có sẵn nhiều, chồng mình cũng được chỉ dáng nên không còn ngượng." },
  { name: "Chị Mai", note: "concept Quý Tộc", text: "Mệt lúc nào là được nghỉ lúc đó. Cảm giác được chăm như người nhà." },
];
const reviewPhotos = [concepts[0], concepts[9], concepts[2]].flatMap((c) => (c?.photos[1] ? [{ src: c.photos[1].src, label: c.name }] : []));

const facebook = "https://www.facebook.com/chupanhbauxinhhanoi";
const maps = "https://maps.app.goo.gl/SVri3sAAURubbUqR7";

const wardrobeNotes = [
  { title: "Váy áo", text: "Mỗi concept một bộ riêng, vừa với mọi tháng bầu." },
  { title: "Phụ kiện", text: "Mũ, hoa, nến, đồ gốm, bối cảnh dựng sẵn." },
  {
    title: "Mẹ chỉ việc đến",
    text: "Ê-kíp chuẩn bị, chỉnh trang phục từng chút.",
  },
];

type Spread = { key: string; left: ReactNode; right: ReactNode };

const spreads: Spread[] = flipped.map((c, i) => ({
  key: c.slug,
  left: <ConceptCover concept={c} index={i} />,
  right: <ConceptInfo concept={c} index={i} />,
}));

/* Dải ảnh trang phục: xen ảnh hậu trường vào giữa các bộ váy. */
const reel = outfits.flatMap((o, i) =>
  i % 3 === 1 && backstage[(i - 1) / 3] ? [o, backstage[(i - 1) / 3]] : [o],
);

export function BookHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const book = root.current!.querySelector<HTMLElement>(".book")!;
      gsap.set(book, { y: "-4vh", rotateX: 70, scale: 1.12 });
      gsap.set(".page-content", { autoAlpha: 0 });
      gsap.utils.toArray<HTMLElement>("[data-rotate]").forEach((el) => {
        gsap.set(el, { rotate: Number(el.dataset.rotate) });
      });

      // Ảnh bung ra từ cuốn sách khi tải trang, nảy nhẹ.
      gsap.from(".card", {
        y: "35vh",
        x: (i) => (i % 2 ? -1 : 1) * 60,
        scale: 0.1,
        autoAlpha: 0,
        duration: 1,
        stagger: { each: 0.07, from: "center" },
        delay: 0.15,
        ease: "back.out(1.6)",
      });
      gsap.from(".icon-bob", {
        scale: 0,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.04,
        delay: 0.6,
        ease: "back.out(3)",
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".float").forEach((el, i) => {
          gsap.to(el, {
            y: -6 - (i % 3) * 2,
            rotate: (i % 2 ? 1 : -1) * (0.8 + (i % 3) * 0.4),
            duration: 2.6 + (i % 4) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
        gsap.utils.toArray<HTMLElement>(".icon-bob").forEach((el, i) => {
          gsap.to(el, {
            y: -12,
            rotate: i % 2 ? 14 : -14,
            duration: 1.1 + (i % 5) * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });

      // Tâm cuốn sách lúc đang nằm: đích để ảnh và chữ thu vào.
      const target = () => {
        const r = book.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      };
      const toBook = (axis: "x" | "y") => (_: number, el: Element) => {
        const r = el.getBoundingClientRect();
        const t = target();
        return axis === "x"
          ? t.x - (r.left + r.width / 2)
          : t.y - (r.top + r.height / 2);
      };

      const tl = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${Math.round((26 + spreads.length * 1.4) * 60)}%`,
            pin: true,
            scrub: 0.8,
            // Khi nội dung giới thiệu bắt đầu hiện thì chữ trang trí chắc chắn đã ẩn, kể cả lúc cuộn nhanh.
            onUpdate: () =>
              root.current?.classList.toggle("is-open", tl.time() > 1.6),
          },
        })
        // 1. Ảnh, chữ, câu thoại thu vào cuốn sách; ánh sáng tắt dần.
        .to(
          ".fly",
          {
            x: toBook("x"),
            y: toBook("y"),
            scale: 0.1,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 1,
          },
          0.4,
        )
        .to(".icon", { autoAlpha: 0.35, duration: 0.8 }, 0.7)
        // 2. Cuốn sách dựng đứng lên giữa màn hình.
        .to(book, { y: 0, rotateX: 0, scale: 1, duration: 1.2 }, 1.3)
        .to(".beam", { autoAlpha: 0, duration: 0.5 }, 1.0)
        .to(".deco", { autoAlpha: 0, duration: 0.3 }, 1.3)
        // 3. Trang giới thiệu hiện ra.
        .to(
          ".page-content",
          { autoAlpha: 1, stagger: 0.15, duration: 0.6 },
          2.2,
        )
        .to({}, { duration: 0.4 });

      // 4. Lật trang: mỗi tờ quay quanh gáy, tờ vừa lật nằm trên các tờ đã lật trước.
      gsap.utils.toArray<HTMLElement>(".leaf").forEach((leaf, k) => {
        const at = 4.4 + k * 1.4;
        tl.set(leaf, { zIndex: 50 + k }, at).to(
          leaf,
          { rotateY: -180, duration: 1, ease: "power2.inOut" },
          at,
        );
      });
      // 5. Sổ gập lại, thu nhỏ về góc trái trên; dải ảnh trang phục chạy ngang qua màn hình.
      const close = 4.4 + spreads.length * 1.4 + 0.4;
      // Nửa phải (bìa sau) gập úp lên nửa trái như đóng sổ thật, rồi thay bằng ảnh sổ đóng ở đúng chỗ đó.
      tl.set(".back-cover", { autoAlpha: 1 }, close)
        .set(".last-right", { autoAlpha: 0 }, close)
        .set(
          [".open-img", ".edge-strip"],
          { clipPath: "inset(0 50% 0 0)" },
          close,
        )
        .fromTo(
          ".back-cover",
          { rotateY: 0 },
          { rotateY: -180, duration: 1, ease: "power2.inOut" },
          close,
        )
        .set([".open-part", ".back-cover"], { autoAlpha: 0 }, close + 1)
        .set(".closed-cover", { autoAlpha: 1 }, close + 1);
      // Sổ đóng được thay bằng bản sao đặt đúng chỗ (FLIP): thu nhỏ tại chỗ, rồi mới bay vào ô cạnh tiêu đề.
      const mini = root.current!.querySelector<HTMLElement>(".mini-book")!;
      const slot = root.current!.querySelector<HTMLElement>(".mini-slot")!;
      const cover = root.current!.querySelector<HTMLElement>(".closed-cover")!;
      // Đo một lần khi tween bắt đầu (ô đích không bị transform), xoá khi ScrollTrigger tính lại.
      let flip: { dx: number; dy: number; s: number } | null = null;
      ScrollTrigger.addEventListener("refreshInit", () => (flip = null));
      const from = () => {
        if (!flip) {
          const a = cover.getBoundingClientRect();
          const b = slot.getBoundingClientRect();
          flip = {
            dx: a.left + a.width / 2 - (b.left + b.width / 2),
            dy: a.top + a.height / 2 - (b.top + b.height / 2),
            s: a.height / b.height,
          };
        }
        return flip;
      };
      tl.set(".wardrobe", { autoAlpha: 1 }, close + 1.05)
        .set(".wardrobe-text, .reel", { autoAlpha: 0 }, close + 1.05)
        .fromTo(
          mini,
          { x: () => from().dx, y: () => from().dy, scale: () => from().s },
          {
            x: () => from().dx,
            y: () => from().dy,
            scale: () => from().s * 0.55,
            duration: 0.6,
            immediateRender: false,
          },
          close + 1.05,
        )
        .set(book, { autoAlpha: 0 }, close + 1.05)
        .to(mini, { x: 0, y: 0, scale: 1, duration: 0.9 }, close + 1.75)
        .to(".wardrobe-text", { autoAlpha: 1, duration: 0.5 }, close + 2.4)
        .to(".reel", { autoAlpha: 1, duration: 0.3 }, close + 2.5)
        .to(
          ".reel",
          {
            x: () =>
              -(
                root.current!.querySelector<HTMLElement>(".reel")!.scrollWidth -
                window.innerWidth
              ),
            ease: "none",
            duration: 5,
          },
          close + 2.6,
        );

      // 6. Quy trình: dải ảnh và chữ trang phục lui đi, sổ nhỏ bay ra giữa vào đúng nửa trái
      //    của sổ quy trình, rồi bìa sau mở ra như lúc gập; bốn bước lần lượt được đánh dấu.
      const proc = close + 7.8;
      const procLeft = root.current!.querySelector<HTMLElement>(".process-left")!;
      let toProc: { dx: number; dy: number; s: number } | null = null;
      ScrollTrigger.addEventListener("refreshInit", () => (toProc = null));
      const procFrom = () => {
        if (!toProc) {
          const a = procLeft.getBoundingClientRect();
          const b = slot.getBoundingClientRect();
          toProc = {
            dx: a.left + a.width / 2 - (b.left + b.width / 2),
            dy: a.top + a.height / 2 - (b.top + b.height / 2),
            s: a.height / b.height,
          };
        }
        return toProc;
      };
      tl.to([".wardrobe-text", ".reel"], { autoAlpha: 0, y: -30, duration: 0.5 }, proc)
        .to(mini, { x: () => procFrom().dx, y: () => procFrom().dy, scale: () => procFrom().s, duration: 1 }, proc + 0.3)
        .set(".process", { autoAlpha: 1 }, proc + 1.3)
        .set(mini, { autoAlpha: 0 }, proc + 1.3)
        .fromTo(".process-leaf", { rotateY: -180 }, { rotateY: 0, duration: 1, ease: "power2.inOut" }, proc + 1.3)
        // Trong lúc mở: chỉ nửa trái lộ ra; bìa sau đáp xuống bên phải thì mới hiện trang phải.
        .fromTo(".process-img", { clipPath: "inset(0 50% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.01 }, proc + 2.3)
        .set(".process-leaf", { autoAlpha: 0 }, proc + 2.3)
        .from(".process-steps", { autoAlpha: 0, duration: 0.4 }, proc + 2.3);
      gsap.utils.toArray<HTMLElement>(".step").forEach((el, i) => {
        const at = proc + 2.6 + i * 0.7;
        tl.from(el, { autoAlpha: 0.25, duration: 0.3 }, at)
          .from(el.querySelector(".tick"), { strokeDashoffset: 30, duration: 0.3 }, at + 0.2)
          .from(el.querySelector(".strike"), { scaleX: 0, duration: 0.3 }, at + 0.3);
      });

      // 7. Cảm nhận: tờ danh sách lật sang trái; mặt sau là ảnh khách, trang phải là lời khách.
      const rev = proc + 2.6 + processSteps.length * 0.7 + 0.6;
      tl.set(".review-page", { autoAlpha: 1 }, rev)
        .to(".process-flip", { rotateY: -180, duration: 1, ease: "power2.inOut" }, rev);
      gsap.utils.toArray<HTMLElement>(".review").forEach((el, i) => {
        tl.from(el, { autoAlpha: 0, y: 20, duration: 0.4 }, rev + 1 + i * 0.5);
      });
      // 8. Liên hệ: chân trang trồi lên từ đáy, cuốn sổ lùi lên và mờ dần phía sau.
      const foot = rev + 1 + reviews.length * 0.5 + 0.6;
      tl.to(".process", { y: "-18vh", scale: 0.86, autoAlpha: 0.35, duration: 1.2 }, foot)
        .fromTo(".site-footer", { yPercent: 100 }, { yPercent: 0, duration: 1.2, ease: "power3.out" }, foot)
        .from(".site-footer .foot-item", { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.5 }, foot + 0.6)
        .to({}, { duration: 0.6 });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-svh overflow-hidden bg-[#030a24]"
      style={skyStyle}
    >
      {/* Mây mờ trôi ngang bầu trời. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[30%] h-[18%] w-[55%] rotate-[-12deg] rounded-full bg-[#3b7bd0]/25 blur-3xl" />
        <div className="absolute right-[-12%] top-[42%] h-[16%] w-[50%] rotate-[10deg] rounded-full bg-[#4a8fe0]/25 blur-3xl" />
        <div className="absolute bottom-[-6%] left-[10%] h-[30%] w-[80%] rounded-full bg-[#5aa8f0]/30 blur-3xl" />
      </div>
      {icons.map((ic, i) => (
        <div
          key={i}
          aria-hidden
          className="icon pointer-events-none absolute"
          style={{
            left: `${ic.left}%`,
            top: `${ic.top}%`,
            width: ic.size,
            height: ic.size,
          }}
        >
          <svg
            className="icon-bob size-full opacity-80 invert"
            viewBox="0 0 24 24"
          >
            <Icon kind={ic.kind} />
          </svg>
        </div>
      ))}

      <h1 className="fly absolute inset-x-0 top-[3vh] z-30 [text-shadow:0_0_24px_rgba(255,255,255,0.35)] text-center font-serif text-[clamp(2.2rem,6.5vw,6rem)] font-extralight leading-none tracking-[0.12em] text-white">
        <span className="font-normal">CHERRY</span>STUDIO
        <span className="mt-3 block font-sans text-xs tracking-[0.35em] text-white/60 md:text-sm">
          {studio.slogan.toUpperCase()}
        </span>
      </h1>

      {floating.map((s, i) => (
        <div
          key={`${s.slug}-${s.n}`}
          className={`fly absolute ${i % 2 ? "z-30" : "z-20"}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `max(${s.width}vw, 64px)`,
          }}
        >
          <div className="float">
            <figure
              className="card relative bg-white p-[5%] pb-[12%] shadow-[0_14px_28px_-10px_rgba(0,0,0,0.35)]"
              data-rotate={s.rotate}
            >
              <span
                aria-hidden
                className="absolute -top-[6%] left-1/2 h-[9%] w-[45%] -translate-x-1/2 -rotate-3 opacity-80"
                style={{ background: tapes[i % tapes.length] }}
              />
              <div className="relative aspect-[3/5] bg-mist">
                <Image
                  src={s.photo.src}
                  alt={s.name}
                  fill
                  loading="eager"
                  sizes="12vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-1 truncate text-center font-serif text-[clamp(0.55rem,0.85vw,0.8rem)] italic text-[#444444]">
                {s.name}
              </figcaption>
            </figure>
          </div>
        </div>
      ))}

      {/* Chùm sáng chóp ngược mờ, ngắn: loe ra từ gáy sách và tan dần lên trên. */}
      <div
        aria-hidden
        className="beam pointer-events-none absolute bottom-[18%] left-1/2 z-10 h-[68vh] w-[96vw] -translate-x-1/2 bg-[linear-gradient(to_top,rgba(220,235,255,0.55),rgba(220,235,255,0.15)_60%,transparent)] blur-2xl [clip-path:polygon(47%_100%,53%_100%,100%_0,0_0)]"
      />

      {/* Cuốn sách: lúc đầu mở nằm sát đáy màn hình, cuộn tới thì dựng đứng giữa màn hình. */}
      <div className="absolute inset-0 z-10 grid place-items-center [perspective:1600px]">
        <div className="book relative aspect-[688/469] w-[min(90vw,66rem,125svh)] origin-bottom [transform-style:preserve-3d]">
          {/* Sổ lò xo bìa kraft (ảnh vẽ màu nước nhìn từ trên xuống). */}
          <Image
            src="/book/notebook-open.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1100px) 66rem, 90vw"
            className="open-img open-part pointer-events-none select-none object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.55)]"
          />
          {/* Bìa kraft khi sổ gập lại. */}
          <Image
            src="/book/notebook-closed.png"
            alt=""
            width={337}
            height={482}
            className="closed-cover pointer-events-none invisible absolute inset-y-0 left-[1%] h-full w-auto -scale-x-100 select-none opacity-0 drop-shadow-[0_30px_30px_rgba(0,0,0,0.55)]"
          />
          {/* Mép giấy và bìa nhìn từ cạnh trước: hiện rõ khi sổ nằm, thành đường mảnh khi dựng đứng. */}
          <div
            aria-hidden
            className="edge-strip open-part absolute inset-x-[0.4%] top-[99%] flex h-[9%] origin-top justify-between bg-[#a8714a] [transform:rotateX(-90deg)]"
          >
            <Image
              src="/book/notebook-edge.png"
              alt=""
              width={452}
              height={69}
              className="h-full w-[49.5%]"
            />
            <Image
              src="/book/notebook-edge.png"
              alt=""
              width={452}
              height={69}
              className="h-full w-[49.5%] -scale-x-100"
            />
          </div>
          <div className="open-part absolute inset-y-[3.5%] left-[3%] w-[42.5%] p-[3%]">
            <p
              aria-hidden
              className="deco in-[.is-open]:!invisible absolute inset-x-[6%] top-[42%] text-center font-serif text-[clamp(1.6rem,4vw,3.6rem)] font-light italic text-[#2a2a2a]"
            >
              Cherry Studio
            </p>
            <span
              aria-hidden
              className="deco in-[.is-open]:!invisible absolute left-[28%] top-[74%] text-2xl text-[#f28b9c]"
            >
              ♥
            </span>
            <span
              aria-hidden
              className="deco in-[.is-open]:!invisible absolute left-[12%] top-[18%] text-xl text-[#9fc8ff]"
            >
              ★
            </span>
            <div className="page-content not-in-[.is-open]:!invisible flex h-full flex-col">
              <p className="text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.3em] text-[#6b6b6b]">
                01 · GIỚI THIỆU
              </p>
              <div className="relative mt-[4%] flex-1 bg-mist">
                {behindTheScenes[0] && (
                  <Image
                    src={behindTheScenes[0].src}
                    alt="Hậu trường buổi chụp tại Cherry Studio"
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                )}
              </div>
              <p className="mt-[3%] font-serif text-[clamp(0.55rem,0.9vw,0.8rem)] italic text-[#6b6b6b]">
                Hậu trường một buổi chụp concept mới
              </p>
            </div>
          </div>
          {/* Bìa sau: nửa phải gập úp sang trái quanh gáy để đóng sổ. */}
          <div className="back-cover invisible absolute inset-y-0 left-1/2 right-0 z-[200] origin-left [transform-style:preserve-3d]">
            <div className="absolute inset-0 overflow-hidden bg-[url(/book/tex-page-right.jpg)] bg-cover py-[3%] pl-[8.5%] pr-[3.5%] backface-hidden">
              {spreads[spreads.length - 1].right}
            </div>
            <div className="absolute inset-0 bg-[url(/book/tex-cover.jpg)] bg-cover backface-hidden [transform:rotateY(180deg)] shadow-[inset_-10px_0_14px_-8px_rgba(0,0,0,0.4)]" />
          </div>
          {/* Trang phải dưới cùng: trang đôi cuối, lộ ra sau khi lật hết. */}
          <div className="last-right open-part absolute inset-y-[3.5%] left-[54%] w-[42.5%] p-[3%]">
            {spreads[spreads.length - 1].right}
          </div>
          {/* Các tờ lật quanh gáy: mặt trước là trang phải của trang đôi trước, mặt sau là trang trái của trang đôi kế tiếp. */}
          <div className="open-part absolute inset-0 [perspective:2600px]">
            {spreads.map((sp, k) => (
              <div
                key={sp.key}
                className="leaf absolute inset-y-[2%] left-1/2 right-[2.5%] origin-left [transform-style:preserve-3d]"
                style={{ zIndex: spreads.length - k }}
              >
                <div className="absolute inset-0 overflow-hidden bg-[url(/book/tex-page-right.jpg)] bg-cover py-[3%] pl-[8.5%] pr-[3.5%] backface-hidden shadow-[inset_14px_0_18px_-12px_rgba(0,0,0,0.25)]">
                  {k === 0 ? (
                    <div className="relative h-full">
                      <p
                        aria-hidden
                        className="deco in-[.is-open]:!invisible absolute inset-x-[8%] top-[42%] text-center font-serif text-[clamp(0.9rem,2vw,1.7rem)] italic leading-snug text-[#4a4a4a]"
                      >
                        Nơi lưu giữ chín tháng
                        <br />
                        đẹp nhất của mẹ
                      </p>
                      <span
                        aria-hidden
                        className="deco in-[.is-open]:!invisible absolute right-[20%] top-[14%] text-2xl text-[#f4c76a]"
                      >
                        ★
                      </span>
                      <span
                        aria-hidden
                        className="deco in-[.is-open]:!invisible absolute right-[38%] top-[66%] text-lg text-[#f4c76a]"
                      >
                        ★
                      </span>
                      <div className="page-content not-in-[.is-open]:!invisible relative flex h-full flex-col">
                        <h2 className="font-serif text-[clamp(1rem,2.4vw,2.2rem)] font-extralight leading-tight text-[#111111]">
                          Hiểu mẹ, từ dáng đứng đến ánh nhìn
                        </h2>
                        <dl className="mt-[5%] grid gap-[4%]">
                          {studio.usp.map((u) => (
                            <div
                              key={u.title}
                              className="border-t border-[#3a3a3a]/25 pt-[2%]"
                            >
                              <dt className="text-[clamp(0.65rem,1.1vw,1rem)] font-medium text-[#111111]">
                                {u.title}
                              </dt>
                              <dd className="text-[clamp(0.55rem,0.95vw,0.9rem)] text-[#6b6b6b]">
                                {u.text}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <a
                          href={tel(studio.hotlines[0])}
                          className="mt-auto self-start bg-[#111111] px-[5%] py-[2.5%] text-[clamp(0.6rem,1vw,0.9rem)] font-medium text-white hover:bg-graphite"
                        >
                          Gọi đặt lịch {studio.hotlines[0]}
                        </a>
                      </div>
                    </div>
                  ) : (
                    spreads[k - 1].right
                  )}
                </div>
                <div className="absolute inset-0 overflow-hidden bg-[url(/book/tex-page-left.jpg)] bg-cover py-[3%] pl-[3%] pr-[9%] backface-hidden [transform:rotateY(180deg)] shadow-[inset_-14px_0_18px_-12px_rgba(0,0,0,0.25)]">
                  {sp.left}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03 · Trang phục: hiện sau khi sổ gập lại thu về góc trái. */}
      <div className="wardrobe pointer-events-none invisible absolute inset-0 z-20 opacity-0">
        <div className="pointer-events-auto absolute left-[6vw] right-[6vw] top-[6vh] flex items-start gap-[3vw] text-white">
          {/* Ô đích của cuốn sổ đóng. */}
          <div className="mini-slot aspect-[337/482] w-[clamp(5rem,9vw,9rem)] shrink-0">
            <div className="mini-book size-full">
              <Image
                src="/book/notebook-closed.png"
                alt=""
                width={337}
                height={482}
                className="size-full -scale-x-100 drop-shadow-[0_20px_20px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
          <div className="wardrobe-text max-w-[46rem]">
            <p className="text-xs tracking-[0.35em] text-white/50">
              03 · TRANG PHỤC
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4.4vw,4rem)] font-extralight leading-[1.05]">
              Có sẵn, mẹ chỉ việc đến
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-white/60">
              {wardrobeNotes.map((n) => (
                <li key={n.title}>
                  <span className="text-white">{n.title}:</span> {n.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="reel absolute bottom-[8vh] left-0 flex w-max items-end gap-[2.5vw] pl-[100vw]">
          {reel.map((r, i) => (
            <figure
              key={r.src}
              className="relative shrink-0 bg-white p-2.5 pb-10 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8)]"
              style={{
                rotate: `${[-3, 2, -1, 3, -2][i % 5]}deg`,
                width: "min(17vw, 15rem)",
                minWidth: 150,
                marginBottom: i % 2 ? "4vh" : 0,
              }}
            >
              <div className="relative aspect-[3/4] bg-mist">
                <Image
                  src={r.src}
                  alt={r.label}
                  fill
                  sizes="17vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-2.5 bottom-2.5 truncate text-center font-serif italic text-[#444444]">
                {r.label}
              </figcaption>
            </figure>
          ))}
          <a
            href={tel(studio.hotlines[0])}
            className="pointer-events-auto mb-[10vh] ml-[4vw] shrink-0 bg-white px-7 py-4 font-medium text-[#111111] hover:bg-white/80"
          >
            Gọi giữ lịch thử đồ
          </a>
        </div>
      </div>

      {/* 04 · Quy trình: sổ mở lại, trang trái là tiêu đề, trang phải là danh sách bốn bước. */}
      <div className="process pointer-events-none invisible absolute inset-0 z-30 grid place-items-center opacity-0">
        <div className="relative aspect-[688/469] w-[min(90vw,66rem,125svh)] [perspective:2600px]">
          <Image src="/book/notebook-open.png" alt="" fill sizes="(min-width: 1100px) 66rem, 90vw" className="process-img select-none object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.55)]" />
          <div className="process-left absolute inset-y-0 left-0 w-1/2" />
          <div className="pointer-events-auto absolute inset-y-[3.5%] left-[3%] w-[42.5%] p-[5%] text-[#111111]">
            <p className="text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.3em] text-[#6b6b6b]">04 · QUY TRÌNH</p>
            <h2 className="mt-[6%] font-serif text-[clamp(1.6rem,4vw,3.8rem)] font-extralight leading-[1.05]">
              Bốn bước,
              <br />
              không vội
            </h2>
            <p className="mt-[6%] max-w-[30ch] text-[clamp(0.65rem,1.05vw,1rem)] leading-relaxed text-[#4a4a4a]">
              Mẹ chỉ cần gọi một cuộc. Mọi thứ còn lại Cherry lo, theo nhịp của mẹ.
            </p>
            <p className="mt-[10%] font-serif text-[clamp(1rem,2vw,1.8rem)] italic text-[#9a9a9a]">♥ Cherry Studio</p>
          </div>
          {/* 05 · Cảm nhận: trang phải nằm dưới tờ danh sách. */}
          <div className="review-page invisible absolute inset-y-[3.5%] left-[54%] flex w-[42.5%] flex-col p-[5%] text-[#111111] opacity-0 [container-type:size]">
            <p className="text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.3em] text-[#6b6b6b]">05 · CẢM NHẬN</p>
            <h2 className="mt-[3cqh] font-serif text-[min(8cqw,6cqh)] font-extralight leading-tight">Những người mẹ đã đến</h2>
            <ul className="mt-[5cqh] grid gap-[4cqh]">
              {reviews.map((r) => (
                <li key={r.name} className="review border-l-2 border-[#d9415a]/50 pl-[5%]">
                  <p className="font-serif text-[min(4.4cqw,3.4cqh)] italic leading-snug text-[#2a2a2a]">“{r.text}”</p>
                  <p className="mt-1 text-[min(3cqw,2.4cqh)] text-[#6b6b6b]">
                    {r.name} · {r.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-[2cqh] text-[min(2.4cqw,2cqh)] text-[#9a9a9a]">* Lời khách đang là nội dung mẫu.</p>
          </div>
          {/* Tờ danh sách: mặt trước là bốn bước, mặt sau là ảnh các mẹ (trang trái của phần cảm nhận). */}
          <div className="process-flip absolute inset-y-[2%] left-1/2 right-[2.5%] z-10 origin-left [transform-style:preserve-3d]">
            <div className="absolute inset-0 bg-[url(/book/tex-page-right.jpg)] bg-cover backface-hidden">
              <ol className="process-steps absolute inset-0 flex flex-col justify-center gap-[6%] py-[6%] pl-[12%] pr-[6%] text-[#111111]">
                {processSteps.map((st, i) => (
                  <li key={st.title} className="step flex items-start gap-[5%]">
                    <svg viewBox="0 0 24 24" className="mt-1 size-[clamp(1rem,1.8vw,1.6rem)] shrink-0" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.6" />
                      <path className="tick" d="M6 12.5l4 4 8-9" fill="none" stroke="#d9415a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" />
                    </svg>
                    <div>
                      <p className="relative inline-block font-serif text-[clamp(1rem,2vw,1.8rem)] leading-tight">
                        <span className="mr-2 text-[#9a9a9a]">0{i + 1}</span>
                        {st.title}
                        <span className="strike absolute inset-x-0 top-[55%] h-[2px] origin-left bg-[#d9415a]/60" />
                      </p>
                      <p className="mt-1 text-[clamp(0.6rem,1vw,0.95rem)] text-[#6b6b6b]">{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="absolute inset-0 bg-[url(/book/tex-page-left.jpg)] bg-cover p-[6%] pr-[10%] backface-hidden [transform:rotateY(180deg)]">
              <div className="relative h-full">
                {reviewPhotos.map((ph, k) => (
                  <figure
                    key={ph.src}
                    className="absolute w-[46%] bg-white p-[3%] pb-[8%] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.45)]"
                    style={{ left: `${[2, 50, 22][k]}%`, top: `${[2, 10, 46][k]}%`, rotate: `${[-5, 4, -2][k]}deg` }}
                  >
                    <div className="relative aspect-[3/4] bg-mist">
                      <Image src={ph.src} alt={ph.label} fill sizes="16vw" className="object-cover" />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          {/* Bìa sau mở ra: nửa phải lật từ trái sang (ngược với lúc gập). */}
          <div className="process-leaf absolute inset-y-0 left-1/2 right-0 origin-left [transform-style:preserve-3d]">
            <div className="absolute inset-0 bg-[url(/book/tex-page-right.jpg)] bg-cover backface-hidden" />
            <div className="absolute inset-0 bg-[url(/book/tex-cover.jpg)] bg-cover backface-hidden [transform:rotateY(180deg)]" />
          </div>
        </div>
      </div>
      {/* 06 · Liên hệ: chân trang trồi lên từ đáy màn hình. */}
      <footer className="site-footer absolute inset-x-0 bottom-0 z-40 rounded-t-[2.5rem] bg-[#f6f5f2] px-[6vw] pb-[4vh] pt-[5vh] text-[#111111] shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="foot-item md:col-span-4">
            <p className="text-sm font-medium tracking-[0.3em] text-[#3a3a3a]">06 · LIÊN HỆ</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.2rem)] font-medium leading-[1.05]">
              Hẹn mẹ ở <em className="text-cherry">Cherry</em>
            </h2>
            <p className="mt-4 max-w-sm text-lg text-[#2a2a2a]">Gọi một cuộc, Cherry giữ lịch và chuẩn bị sẵn váy áo cho mẹ.</p>
            <div className="mt-6 grid gap-3">
              {studio.hotlines.map((h, k) => (
                <a
                  key={h}
                  href={tel(h)}
                  className="flex w-fit items-center gap-4 rounded-full bg-[#111111] py-3 pl-3 pr-7 text-white hover:bg-cherry"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-white text-sm font-semibold text-[#111111]">0{k + 1}</span>
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.2vw,2rem)] font-semibold tracking-wide [font-variant-numeric:lining-nums]">{h}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="foot-item grid content-start gap-4 md:col-span-4">
            {studio.branches.map((b) => (
              <a
                key={b.label}
                href={maps}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-[#111111]/15 bg-white p-5 transition-colors hover:border-[#111111]"
              >
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold">{b.label}</p>
                <p className="mt-1 text-base text-[#2a2a2a]">{b.address}</p>
                <p className="mt-3 text-sm font-medium text-cherry group-hover:underline">Chỉ đường →</p>
              </a>
            ))}
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#111111] px-6 font-semibold hover:bg-[#111111] hover:text-white"
            >
              Nhắn Facebook Cherry Studio
            </a>
          </div>
          {/* Góc ảnh: vài polaroid để chân trang không trống. */}
          <div className="foot-item relative hidden min-h-[18rem] md:col-span-4 md:block">
            {flipped.slice(0, 3).map((c, k) => (
              <figure
                key={c.slug}
                className="absolute w-[46%] bg-white p-2 pb-7 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.45)]"
                style={{ left: `${[4, 50, 26][k]}%`, top: `${[0, 8, 40][k]}%`, rotate: `${[-6, 5, -2][k]}deg` }}
              >
                <div className="relative aspect-[3/4] bg-mist">
                  <Image src={c.photos[0].src} alt={c.name} fill sizes="14vw" className="object-cover" />
                </div>
                <figcaption className="absolute inset-x-2 bottom-1.5 truncate text-center font-[family-name:var(--font-display)] text-sm italic text-[#3a3a3a]">{c.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="foot-item mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-[#111111]/20 pt-6">
          <p className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-none tracking-[0.04em]">
            CHERRY<span className="font-medium italic text-cherry">studio</span>
          </p>
          <p className="text-base text-[#2a2a2a]">© Cherry Studio · {studio.slogan}</p>
        </div>
      </footer>
    </section>
  );
}
