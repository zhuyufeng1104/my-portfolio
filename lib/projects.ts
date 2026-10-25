export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const projects = [
  {
    slug: "afterlight",
    title: "AFTERLIGHT",
    category: "AI Film",
    year: "2026",
    image: assetPath("/images/afterlight.svg"),
    zh: "余光",
    description: [
      "A speculative journey through the last light of an imagined world. An exploration of memory, atmosphere, and synthetic landscapes.",
      "穿越想象世界中最后一束光，探索记忆、氛围与合成景观之间的关系。",
    ],
  },
  {
    slug: "liquid-form",
    title: "LIQUID FORM",
    category: "Commercial",
    year: "2026",
    image: assetPath("/images/liquid-form.svg"),
    zh: "流体形态",
    description: [
      "A self-initiated product-film study in light, texture, and motion. No brand or client affiliation.",
      "一项关于光线、质感与运动的自主产品影像练习，不代表任何品牌或客户。",
    ],
  },
  {
    slug: "echoes",
    title: "ECHOES",
    category: "Live Visuals",
    year: "2025",
    image: assetPath("/images/echoes.svg"),
    zh: "回响",
    description: [
      "An imagined stage environment where sound becomes architecture. A concept for immersive concert visuals.",
      "让声音成为建筑，一组探索沉浸式演唱会视觉的舞台概念。",
    ],
  },
  {
    slug: "other-sun",
    title: "OTHER SUN",
    category: "Creative",
    year: "2025",
    image: assetPath("/images/other-sun.svg"),
    zh: "另一个太阳",
    description: [
      "An abstract visual poem about unfamiliar places and the quiet possibility of another reality.",
      "一首关于陌生之地的抽象视觉诗，寻找另一种现实的安静可能。",
    ],
  },
];
export type Project = (typeof projects)[number];
