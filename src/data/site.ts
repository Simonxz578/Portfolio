export const site = {
  name: "Xiang Zhang",
  displayName: "Xiang Zhang (Simon)",
  role: "AI Product & Applied AI",
  description:
    "Xiang Zhang works across applied AI, product judgement, model evaluation and organisational adoption.",
  email: "xz578@cam.ac.uk",
  linkedin: "https://www.linkedin.com/in/xiang-zhang-1673a2369",
  locale: "en-GB",
  socialImage: "/images/social/xiang-zhang-portfolio.jpg",
  portrait: {
    jpeg: "/images/portrait/xiang-zhang-simon-724.jpg",
    webp: "/images/portrait/xiang-zhang-simon-724.webp",
    jpegSmall: "/images/portrait/xiang-zhang-simon-480.jpg",
    webpSmall: "/images/portrait/xiang-zhang-simon-480.webp",
    width: 724,
    height: 1086,
    alt: "Xiang Zhang in formal academic dress beside Cambridge college stonework."
  },
  resumePdfPath: null as string | null,
  navigation: [
    { label: "Work", href: "/work/" },
    { label: "Research", href: "/research/" },
    { label: "Leadership", href: "/leadership/" },
    { label: "About", href: "/about/" },
    { label: "Résumé", href: "/resume/" },
    { label: "Contact", href: "/contact/" }
  ]
} as const;
