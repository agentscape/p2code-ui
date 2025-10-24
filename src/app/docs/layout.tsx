"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const navItems = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/platform-integration", label: "Platform Integration" },
  { href: "/docs/service-operations", label: "Service Operations" },
  { href: "/docs/development-guidance", label: "Development Guidance" },
];

export default function DocsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--mui-palette-background-default, #fafafa)",
      }}
    >
      <aside
        style={{
          width: "260px",
          padding: "2rem 1.5rem",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          backgroundColor: "var(--mui-palette-background-paper, #fff)",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          P2CODE Documentation
        </h1>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname?.startsWith(item.href) && item.href !== "/docs");
              return (
                <li key={item.href} style={{ marginBottom: "0.75rem" }}>
                  <Link
                    href={item.href}
                    style={{
                      textDecoration: "none",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "var(--mui-palette-primary-main, #1976d2)"
                        : "inherit",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main
        style={{
          flex: 1,
          padding: "2rem 3rem",
          maxWidth: "960px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
