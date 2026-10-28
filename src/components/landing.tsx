"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  behindTheScenes,
  type Concept,
  concepts,
  studio,
  type Tag,
  tags,
  tel,
} from "@/data/concepts";
import { Scroll3D } from "@/components/scroll-3d";

const facebook = "https://www.facebook.com/chupanhbauxinhhanoi";
const maps = "https://maps.app.goo.gl/SVri3sAAURubbUqR7";

const steps = [
  { title: "Gọi hoặc nhắn tin", text: "Mẹ chọn ngày, Cherry giữ lịch cho mẹ." },
  {
    title: "Chọn concept",
    text: "Cùng thử trang phục, phụ kiện có sẵn ở studio.",
  },
  { title: "Chụp", text: "Ê-kíp chỉ dáng từng chút, mẹ mệt thì nghỉ." },
  { title: "Nhận ảnh", text: "Ảnh chỉnh kỹ, gửi lại cho mẹ giữ mãi." },
];

type Open = { concept: Concept; index: number };

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* CTA nhỏ cuối mỗi chương, theo pattern Scroll-Triggered Storytelling. */
function ChapterCta({ text }: { text: string }) {
  return (
    <p className="mt-12 text-graphite">
      {text}{" "}
      <a
        href={tel(studio.hotlines[0])}
        className="inline-flex min-h-11 items-center font-medium text-ink underline decoration-1 underline-offset-8 hover:text-cherry"
      >
        Gọi {studio.hotlines[0]}
      </a>
    </p>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#" className="text-lg">
          <span className="font-medium">Cherry</span> Studio
        </a>
        <nav className="hidden gap-8 text-sm text-graphite md:flex">
          <a href="#concept" className="hover:text-ink">
            Concept
          </a>
          <a href="#quy-trinh" className="hover:text-ink">
            Quy trình
          </a>
          <a href="#lien-he" className="hover:text-ink">
            Liên hệ
          </a>
        </nav>
        <a
          href={tel(studio.hotlines[0])}
          className="text-sm font-medium text-cherry"
        >
          {studio.hotlines[0]}
        </a>
      </div>
    </header>
  );
}

/* Ảnh rải trên cuốn sách mở: concept, vị trí (% sân khấu), góc nghiêng, kích thước. */
const scattered = [
  { slug: "tone-tim", left: 4, bottom: 34, rotate: -14, width: 24 },
  { slug: "quy-toc", left: 22, bottom: 46, rotate: -5, width: 25 },
  { slug: "a-from-girl-a-to-mom", left: 39, bottom: 40, rotate: 3, width: 28 },
  { slug: "tone-hong", left: 60, bottom: 47, rotate: 9, width: 24 },
  { slug: "chup-voi-ngua", left: 74, bottom: 33, rotate: 16, width: 23 },
  { slug: "me-bau-chup-voi-chong", left: 47, bottom: 22, rotate: -8, width: 20 },
].map((s) => ({ ...s, photo: concepts.find((c) => c.slug === s.slug)!.photos[0] }));

function PhotoBook() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[44rem] [perspective:1400px]">
      {/* Cuốn sách nằm ngả về phía sau, tên studio in trên trang trái. */}
      <div className="absolute inset-x-[2%] bottom-[2%] h-[48%] origin-bottom [transform:rotateX(58deg)] [transform-style:preserve-3d]">
        <div className="absolute -inset-[2%] rounded-md bg-ink shadow-[0_40px_60px_-20px_rgba(0,0,0,0.45)]" />
        <div className="absolute inset-0 flex">
          <div className="relative flex-1 rounded-l-sm bg-[linear-gradient(to_right,#f4f3f1,#ffffff_70%,#dcdad6)] shadow-[-3px_3px_0_#e6e4e0,-6px_6px_0_#d6d3ce]">
            <div className="absolute bottom-[14%] left-[12%] right-[12%]">
              <p className="font-serif whitespace-nowrap text-[clamp(0.9rem,2.2vw,1.9rem)] font-light not-italic tracking-[0.12em]">
                CHERRY STUDIO
              </p>
              <div className="mt-2 h-px w-full bg-ink/40" />
            </div>
          </div>
          <div className="relative flex-1 rounded-r-sm bg-[linear-gradient(to_left,#f4f3f1,#ffffff_70%,#dcdad6)] shadow-[3px_3px_0_#e6e4e0,6px_6px_0_#d6d3ce]" />
        </div>
      </div>

      {scattered.map((s, i) => (
        <div
          key={s.slug}
          className="drop-in absolute bg-paper p-[1.2%] pb-[4%] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.4)]"
          style={{
            left: `${s.left}%`,
            bottom: `${s.bottom}%`,
            width: `${s.width}%`,
            rotate: `${s.rotate}deg`,
            animationDelay: `${200 + i * 120}ms`,
          }}
        >
          <div className="relative aspect-[3/4] bg-mist">
            <Image
              src={s.photo.src}
              alt=""
              fill
              loading="eager"
              preload={i === 2}
              sizes="(min-width: 768px) 14vw, 28vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 md:grid-cols-12 md:px-8 md:pb-28">
      <div className="md:order-2 md:col-span-7">
        <PhotoBook />
      </div>
      <div className="md:order-1 md:col-span-5">
        <h1 className="font-serif text-[clamp(2.5rem,4.6vw,4.5rem)] font-extralight leading-[1.05] tracking-[-0.02em] text-balance">
          Tôn vinh vẻ đẹp,
          <br />
          ghi dấu khoảnh khắc
        </h1>
        <p className="mt-8 max-w-sm text-lg text-graphite">
          Studio chụp ảnh bầu ở Hà Nội và Phú Thọ. Váy áo, phụ kiện có sẵn, mẹ
          chỉ cần đến.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={tel(studio.hotlines[0])}
            className="inline-flex min-h-11 items-center bg-ink px-7 py-4 font-medium text-paper hover:bg-cherry"
          >
            Gọi đặt lịch
          </a>
          <a
            href="#concept"
            className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-8"
          >
            Xem {concepts.length} concept
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-mist">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <h2 className="font-serif text-4xl font-extralight leading-tight md:col-span-5 md:text-5xl">
          Hiểu mẹ, từ dáng đứng đến ánh nhìn
        </h2>
        <Reveal className="md:col-span-6 md:col-start-7">
          <dl className="grid gap-10">
            {studio.usp.map((u) => (
              <div key={u.title} className="border-t border-ink/20 pt-5">
                <dt className="text-lg font-medium">{u.title}</dt>
                <dd className="mt-1 max-w-md text-graphite">{u.text}</dd>
              </div>
            ))}
          </dl>
          <ChapterCta text="Mẹ còn băn khoăn?" />
        </Reveal>
      </div>
    </section>
  );
}

/* Catalog dựng như một tờ contact sheet: mỗi concept là một hàng, dải ảnh nhỏ bên phải. */
function ContactSheet({ onOpen }: { onOpen: (o: Open) => void }) {
  const [filter, setFilter] = useState<Tag | null>(null);
  const shown = filter
    ? concepts.filter((c) => c.tags.includes(filter))
    : concepts;

  return (
    <section
      id="concept"
      className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-5xl font-extralight md:text-7xl">
          Mỗi mẹ một câu chuyện
        </h2>
        <div
          role="group"
          aria-label="Lọc concept"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {[null, ...tags].map((t) => (
            <button
              key={t ?? "all"}
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`min-h-11 ${
                filter === t
                  ? "text-ink underline decoration-1 underline-offset-8"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {t ?? "Tất cả"}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-14 border-b border-ink">
        {shown.map((c) => (
          <li key={c.slug} className="border-t border-ink">
            <Reveal className="grid gap-5 py-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl font-light md:text-4xl">
                  {c.name}
                </h3>
                <p className="mt-1 italic text-graphite">{c.caption}</p>
                <p className="mt-4 hidden max-w-sm text-sm text-graphite md:block">
                  {c.description}
                </p>
                <p className="mt-4 text-sm text-graphite">
                  {c.photos.length} ảnh
                </p>
              </div>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:col-span-8 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
                {c.photos.slice(0, 4).map((p, i) => (
                  <button
                    key={p.src}
                    onClick={() => onOpen({ concept: c, index: i })}
                    aria-label={`Xem ảnh ${i + 1} của ${c.name}`}
                    className="relative aspect-[3/4] w-36 shrink-0 bg-mist md:w-auto"
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 15vw, 144px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <ChapterCta text="Ưng concept nào, mẹ gọi Cherry giữ lịch nhé." />
    </section>
  );
}

function Wardrobe() {
  if (behindTheScenes.length === 0) return null;
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-serif text-4xl font-extralight md:text-5xl">
          Có sẵn, mẹ chỉ việc đến
        </h2>
        <p className="mt-4 max-w-md text-paper/70">
          Váy áo, mũ, hoa và bối cảnh được chuẩn bị theo từng concept, vừa với
          mọi tháng bầu.
        </p>
      </div>
      <div className="mt-12 flex gap-2 overflow-x-auto px-4 md:px-8">
        {behindTheScenes.slice(0, 12).map((p) => (
          <div
            key={p.src}
            className="relative aspect-[3/4] w-52 shrink-0 md:w-72"
          >
            <Image
              src={p.src}
              alt="Hậu trường Cherry Studio"
              fill
              sizes="288px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      id="quy-trinh"
      className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28"
    >
      <h2 className="font-serif text-4xl font-extralight md:text-5xl">
        Bốn bước, không vội
      </h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="font-serif text-6xl font-extralight text-graphite/50">
              {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
            <p className="mt-1 text-graphite">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section id="lien-he" className="bg-mist">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-7">
          <h2 className="font-serif text-5xl font-extralight md:text-7xl">
            Hẹn mẹ ở Cherry
          </h2>
          <div className="mt-10 space-y-1">
            {studio.hotlines.map((h) => (
              <a
                key={h}
                href={tel(h)}
                className="block font-serif text-4xl font-light text-cherry hover:underline md:text-5xl"
              >
                {h}
              </a>
            ))}
          </div>
          <a
            href={facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block underline decoration-1 underline-offset-8"
          >
            Nhắn tin qua Facebook
          </a>
        </div>
        <address className="not-italic md:col-span-4 md:col-start-9 md:self-end">
          {studio.branches.map((b) => (
            <div key={b.label} className="border-t border-ink/20 py-5">
              <p className="font-medium">{b.label}</p>
              <p className="text-graphite">{b.address}</p>
            </div>
          ))}
          <a
            href={maps}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4"
          >
            Chỉ đường trên Google Maps
          </a>
        </address>
      </div>
    </section>
  );
}

function Lightbox({ open, onClose }: { open: Open; onClose: () => void }) {
  const { concept } = open;
  const [i, setI] = useState(open.index);
  const n = concept.photos.length;
  const photo = concept.photos[i];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + n) % n);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [n, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={concept.name}
      className="fixed inset-0 z-50 flex flex-col bg-ink text-paper"
    >
      <div className="flex items-start justify-between gap-6 p-4 md:p-6">
        <div>
          <p className="font-serif text-2xl font-light">{concept.name}</p>
          <p className="mt-1 max-w-xl text-sm text-paper/60">
            {concept.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="min-h-11 shrink-0 px-2 text-sm underline underline-offset-4"
        >
          Đóng
        </button>
      </div>
      <div className="relative flex-1">
        <Image
          key={photo.src}
          src={photo.src}
          alt={`${concept.name}, ảnh ${i + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
        />
        <button
          aria-label="Ảnh trước"
          onClick={() => setI((i - 1 + n) % n)}
          className="absolute inset-y-0 left-0 w-1/3"
        />
        <button
          aria-label="Ảnh sau"
          onClick={() => setI((i + 1) % n)}
          className="absolute inset-y-0 right-0 w-1/3"
        />
      </div>
      <p className="p-4 text-center text-sm text-paper/60">
        {i + 1} / {n}
      </p>
    </div>
  );
}

export function Landing() {
  const [open, setOpen] = useState<Open | null>(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Scroll3D />
        <ContactSheet onOpen={setOpen} />
        <Wardrobe />
        <Process />
        <Contact />
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-8 text-sm text-graphite md:px-8">
        © {new Date().getFullYear()} Cherry Studio
      </footer>
      <a
        href={tel(studio.hotlines[0])}
        className="fixed inset-x-4 bottom-4 z-40 bg-ink py-4 text-center font-medium text-paper md:hidden"
      >
        Gọi đặt lịch {studio.hotlines[0]}
      </a>
      {open && <Lightbox open={open} onClose={() => setOpen(null)} />}
    </>
  );
}
