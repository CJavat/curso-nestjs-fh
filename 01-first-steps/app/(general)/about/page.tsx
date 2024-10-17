import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Title",
  description: "SEO Description",
  keywords: ["About Page", "Daniel", "FSociety"],
};

export default function AboutPage() {
  return <span className="text-3xl">About Page {new Date().getTime()}</span>;
}
