"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SOCIAL } from "@/lib/constants";

interface InstagramFeedProps {
  photos: string[];
}

export default function InstagramFeed({ photos }: InstagramFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || photos.length === 0) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.4;

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, photos.length]);

  if (photos.length === 0) return null;

  const duplicated = [...photos, ...photos];

  return (
    <section style={{ padding: "56px 0 64px", overflow: "hidden" }}>
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-divider" />
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800, marginTop: 10 }}>
              I nostri fiori
            </h2>
          </div>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-white)",
              color: "var(--text)",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            @flowerexcellence
          </a>
        </div>
      </div>

      {/* Scrolling feed */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "hidden",
          padding: "8px 24px",
        }}
      >
        {duplicated.map((src, idx) => (
          <a
            key={idx}
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-card"
            style={{
              flexShrink: 0,
              width: 260,
              height: 260,
              borderRadius: 16,
              overflow: "hidden",
              border: "1.5px solid var(--border)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
              position: "relative",
              display: "block",
            }}
          >
            <Image
              src={src}
              alt="Flowerex — fiori recisi"
              fill
              sizes="260px"
              style={{ objectFit: "cover" }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
