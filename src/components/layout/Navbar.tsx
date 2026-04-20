"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { CONTACT } from "@/lib/constants";

const NAV_LINKS = [
  {
    label: "Come funziona",
    href: null,
    children: [
      {
        label: "Tempi di consegna",
        href: "/consegne",
        description: "Quando fare l'ordine e quando aspettarti i fiori",
      },
    ],
  },
];

function WaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <div>
      {/* ── Desktop + tablet navbar ── */}
      <nav
        className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          height: "var(--nav-h)",
          background: "rgba(250,250,248,0.92)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="mx-auto h-full flex items-center justify-between"
          style={{ maxWidth: 1200, padding: "0 24px" }}
          ref={dropdownRef}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <Image src="/logo-flowerex.png" alt="Flowerex" width={32} height={32} priority />
            <span
              className="nav-logo-text"
              style={{ fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em" }}
            >
              FLOWEREX
            </span>
          </Link>

          {/* Desktop nav items */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map((item) => {
              const isOpen = openDropdown === item.label;
              const isActive = item.children?.some((c) => c.href === pathname);
              return (
                <div key={item.label} style={{ position: "relative" }}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    style={{
                      padding: "8px 14px", borderRadius: 8, border: "none",
                      background: "transparent", cursor: "pointer",
                      fontSize: "0.875rem", fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--orange)" : "var(--text-secondary)",
                      display: "flex", alignItems: "center", gap: 5,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--orange)";
                      e.currentTarget.style.background = "var(--orange-dim)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isActive ? "var(--orange)" : "var(--text-secondary)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item.label}
                    <svg
                      width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isOpen && item.children && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 8px)", left: 0,
                      background: "var(--bg-white)", border: "1px solid var(--border)",
                      borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                      minWidth: 260, padding: 6, zIndex: 100,
                    }}>
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href!}
                            onClick={() => setOpenDropdown(null)}
                            style={{
                              display: "flex", flexDirection: "column",
                              padding: "11px 14px", borderRadius: 10,
                              textDecoration: "none",
                              background: childActive ? "var(--orange-dim)" : "transparent",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              if (!childActive) e.currentTarget.style.background = "var(--orange-dim)";
                            }}
                            onMouseLeave={(e) => {
                              if (!childActive) e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: childActive ? "var(--orange)" : "var(--text)" }}>
                              {child.label}
                            </span>
                            {child.description && (
                              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>
                                {child.description}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 6px" }} />

            <span className="navbar-question" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Hai bisogno di informazioni?
            </span>

            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 18px", background: "var(--orange)", color: "#fff",
                borderRadius: 10, fontWeight: 600, fontSize: "0.85rem",
                textDecoration: "none", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--orange-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--orange)"; }}
            >
              <WaIcon />
              Contattaci
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 6, borderRadius: 8, color: "var(--text)",
              display: "none",
            }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu panel ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", top: "var(--nav-h)", left: 0, right: 0,
            background: "rgba(250,250,248,0.97)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 20px 24px",
            zIndex: 49,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 10 }}>
              Come funziona
            </div>
            {NAV_LINKS.flatMap((item) => item.children ?? []).map((child) => {
              const active = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href!}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 16px", borderRadius: 12, textDecoration: "none",
                    background: active ? "var(--orange-dim)" : "var(--bg-white)",
                    border: `1px solid ${active ? "var(--orange-border)" : "var(--border)"}`,
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: active ? "var(--orange)" : "var(--text)" }}>
                      {child.label}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>
                      {child.description}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>

          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "14px 20px", background: "var(--orange)", color: "#fff",
              borderRadius: 14, fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", boxShadow: "0 4px 16px rgba(232,100,44,0.25)",
            }}
          >
            <WaIcon size={20} />
            Contattaci su WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
