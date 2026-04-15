"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();

  // La pagina /hamifleurs ha già un disclaimer bar dedicato: evitiamo la doppia barra.
  if (pathname?.startsWith("/hamifleurs")) return null;

  return (
    <div
      style={{
        background: "var(--text)",
        color: "#fff",
        fontSize: "0.85rem",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/hamifleurs"
        className="topbar-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#fff",
          textDecoration: "none",
          fontWeight: 500,
          opacity: 0.95,
          transition: "opacity 0.2s ease",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>
          Sei un cliente <strong style={{ fontWeight: 700 }}>Hamifleurs</strong>?
          Accedi all&apos;area dedicata
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
