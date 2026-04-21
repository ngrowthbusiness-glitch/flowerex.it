import type { Metadata } from "next";
import CalcolatoreClient from "@/components/calcolatore/CalcolatoreClient";

// Pagina interna – non indicizzata, non linkata in nav
export const metadata: Metadata = {
  title: "Calcolatore Prezzi | Flowerex",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <CalcolatoreClient />;
}
