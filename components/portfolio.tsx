"use client";
import Link from "next/link";
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { projects, type Project } from "@/lib/projects";
const Language = createContext({ zh: false, toggle: () => {} });
function subscribeLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-language-change", callback);
  };
}
function languageSnapshot() {
  try {
    return localStorage.getItem("portfolio-language") === "zh";
  } catch {
    return false;
  }
}
export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const zh = useSyncExternalStore(
    subscribeLanguage,
    languageSnapshot,
    () => false,
  );
  useEffect(() => {
    document.documentElement.lang = zh ? "zh-CN" : "en";
  }, [zh]);
  const toggle = () => {
    try {
      localStorage.setItem("portfolio-language", zh ? "en" : "zh");
      window.dispatchEvent(new Event("portfolio-language-change"));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  };
  return (
    <Language.Provider value={{ zh, toggle }}>{children}</Language.Provider>
  );
}
export function Navigation() {
  const { zh, toggle } = useContext(Language);
  const [open, setOpen] = useState(false);
  return (
    <header className="navigation">
      <Link
        href="/"
        className="wordmark"
        aria-label="FRAME home"
        onClick={() => setOpen(false)}
      >
        FRAME<span>®</span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? (zh ? "关闭 −" : "CLOSE −") : zh ? "菜单 +" : "MENU +"}
      </button>
      <nav
        id="main-nav"
        className={open ? "nav-links is-open" : "nav-links"}
        aria-label={zh ? "主导航" : "Main navigation"}
      >
        {[
          ["/works", zh ? "作品" : "WORKS"],
          ["/#about", zh ? "关于" : "ABOUT"],
          ["/#contact", zh ? "联系" : "CONTACT"],
        ].map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <button
          onClick={toggle}
          aria-label={zh ? "Switch to English" : "切换为中文"}
          className="language"
        >
          {zh ? "EN / 中文" : "EN / 中"}
        </button>
      </nav>
    </header>
  );
}
function Card({ project, index }: { project: Project; index: number }) {
  const { zh } = useContext(Language);
  return (
    <Link href={`/projects/${project.slug}`} className="project-card group">
      <div className="poster">
        <Image
          src={project.image}
          alt={
            zh
              ? `${project.zh}：抽象概念海报`
              : `${project.title} abstract concept poster`
          }
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <span className="poster-number">0{index + 1} / CONCEPT</span>
        <span className="poster-title">
          {project.title.split(" ").map((word, i) => (
            <span key={i}>
              {word}
              <br />
            </span>
          ))}
        </span>
        <span className="poster-arrow" aria-hidden>
          ↗
        </span>
      </div>
      <div className="card-meta">
        <h3>{zh ? project.zh : project.title}</h3>
        <span>
          {project.category} <i>/</i> {project.year}
        </span>
      </div>
    </Link>
  );
}
export function Home() {
  const { zh } = useContext(Language);
  return (
    <main>
      <section className="hero">
        <div className="hero-art" aria-hidden />
        <div className="hero-grain" aria-hidden />
        <div className="hero-top">
          <span>INDEPENDENT AI VISUAL CREATOR</span>
          <span className="status">
            <b /> {zh ? "开放创意合作" : "OPEN FOR COLLABORATION"}
          </span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            {zh ? "想象之外，影像之中" : "IMAGINATION, MADE VISIBLE."}
          </p>
          <h1>
            BEYOND
            <br />
            <span>THE REAL.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              {zh
                ? "用 AI 探索影像的边界。\n以电影语言，构建未曾见过的世界。"
                : "Exploring the edges of image-making.\nBuilding unseen worlds through AI & cinema."}
            </p>
            <Link href="/works" className="round-link">
              {zh ? "探索作品" : "EXPLORE WORK"} <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="hero-foot">
          <span>AI FILM · COMMERCIAL · LIVE VISUALS</span>
          <a href="#selected">{zh ? "向下探索" : "SCROLL TO DISCOVER"} ↓</a>
        </div>
      </section>
      <section id="selected" className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / {zh ? "精选作品" : "SELECTED WORK"}</p>
            <h2>{zh ? "想象的切片。" : "A FEW OTHER\nREALITIES."}</h2>
          </div>
          <Link href="/works" className="text-link">
            {zh ? "全部作品" : "ALL WORKS"} ↗
          </Link>
        </div>
        <p className="demo-note">
          {zh
            ? "以下均为演示概念作品及占位素材，不代表真实客户项目。"
            : "A collection of demo concepts. Placeholder artwork; no real client projects are represented."}
        </p>
        <div className="project-grid">
          {projects.slice(0, 2).map((p, i) => (
            <Card project={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>
      <section id="about" className="section about">
        <p className="eyebrow">02 / {zh ? "关于创作" : "THE PRACTICE"}</p>
        <div>
          <h2>
            {zh
              ? "技术是工具。\n感受是起点。"
              : "HUMAN FEELING.\nMACHINE DREAMING."}
          </h2>
          <p className="about-copy">
            {zh
              ? "我是一名 AI 影像创作者，在电影叙事与生成式技术之间寻找新的表达。从一束光、一个念头，到完整的视觉世界，探索 AI Film、商业广告、演唱会视觉与创意影像的更多可能。"
              : "I’m an AI visual creator working at the intersection of cinematic storytelling and generative technology. From a fragment of light to an entire imagined world, I explore new possibilities in film, commercial imagery, live visuals, and creative experiments."}
          </p>
          <div className="disciplines">
            {[
              "AI FILM",
              "COMMERCIAL IMAGERY",
              "LIVE VISUALS",
              "CREATIVE DIRECTION",
            ].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                {s}
                <span>↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
function Contact() {
  const { zh } = useContext(Language);
  return (
    <section id="contact" className="section contact">
      <p className="eyebrow">03 / {zh ? "开启对话" : "START A CONVERSATION"}</p>
      <h2>{zh ? "一起创造\n下一帧。" : "LET’S MAKE\nTHE NEXT FRAME."}</h2>
      <p>
        {zh
          ? "期待与创作者、团队和品牌探索新的影像可能。"
          : "For creative collaborations, new ideas, and unexpected possibilities."}
      </p>
      <a className="contact-link" href="mailto:hello@example.com">
        hello@example.com <span>↗</span>
      </a>
      <p className="demo-note">
        {zh
          ? "演示联系邮箱，请在正式发布前替换为你的真实邮箱。"
          : "Demo email — replace with your own address before publishing."}
      </p>
    </section>
  );
}
export function Works() {
  const { zh } = useContext(Language);
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "AI Film",
    "Commercial",
    "Live Visuals",
    "Creative",
  ];
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">THE ARCHIVE / 2025—2026</p>
        <h1>
          {zh ? "精选作品。" : "SELECTED\nWORKS."}
          <sup>(04)</sup>
        </h1>
        <p>
          {zh
            ? "电影、实验与想象中的世界。所有项目均为演示概念。"
            : "Films, experiments, and imagined worlds. All projects are demo concepts."}
        </p>
      </section>
      <section className="section works-section">
        <div className="filters" aria-label={zh ? "作品分类" : "Filter works"}>
          {categories.map((c) => (
            <button
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              key={c}
            >
              {c === "All" ? (zh ? "全部" : "ALL WORK") : c}
              <span>{c === "All" ? "04" : "01"}</span>
            </button>
          ))}
        </div>
        <div className="project-grid">
          {projects.map((p, i) =>
            filter === "All" || filter === p.category ? (
              <Card key={p.slug} project={p} index={i} />
            ) : null,
          )}
        </div>
      </section>
      <Contact />
    </main>
  );
}
export function ProjectDetail({ project }: { project: Project }) {
  const { zh } = useContext(Language);
  const next =
    projects[
      (projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length
    ];
  return (
    <main>
      <section className="page-intro project-intro">
        <Link href="/works" className="eyebrow">
          ← {zh ? "全部作品" : "ALL WORKS"}
        </Link>
        <h1>{project.title}</h1>
        <div className="project-info">
          <p>
            {project.category} / {project.year}
            <br />
            {zh ? "自主概念 · 演示作品" : "SELF-INITIATED CONCEPT · DEMO"}
          </p>
          <p>{project.description[zh ? 1 : 0]}</p>
        </div>
      </section>
      <section className="section detail-media">
        <div className="detail-poster">
          <Image
            src={project.image}
            alt={zh ? project.zh : project.title}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="video-caption">
          <h2>{zh ? "影像预览" : "MOTION STUDY"}</h2>
          <p>
            {zh
              ? "以下为通用演示视频，不是本项目的正式影片。"
              : "Generic sample video below; not a finished film for this concept."}
          </p>
        </div>
        <video
          controls
          preload="none"
          playsInline
          poster={project.image}
          aria-label={zh ? "通用演示视频" : "Generic demo video"}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
          {zh
            ? "浏览器不支持视频播放。"
            : "Your browser does not support video playback."}
        </video>
        <p className="demo-note">
          {zh
            ? "示例视频：MDN / CC0。视频播放需要访问外部媒体服务。"
            : "Sample footage: MDN / CC0. Video playback requires access to the external media host."}
        </p>
        <Link className="next-project" href={`/projects/${next.slug}`}>
          <span className="eyebrow">{zh ? "下一个项目" : "NEXT PROJECT"}</span>
          <strong>{next.title} ↗</strong>
        </Link>
      </section>
    </main>
  );
}
export function Footer() {
  const { zh } = useContext(Language);
  return (
    <footer>
      <Link className="wordmark" href="/">
        FRAME<span>®</span>
      </Link>
      <p>
        © {new Date().getFullYear()} FRAME.{" "}
        {zh ? "个人作品集演示" : "PORTFOLIO DEMO"}
      </p>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          });
        }}
      >
        {zh ? "返回顶部" : "BACK TO TOP"} ↑
      </a>
    </footer>
  );
}
