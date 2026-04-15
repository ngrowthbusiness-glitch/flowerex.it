import type { Metadata } from "next";
import HamifleursPage from "@/components/hamifleurs/HamifleursPage";

export const metadata: Metadata = {
  title: "Hamifleurs — Area Clienti",
  description:
    "Guida operativa per l'acquisto di fiori su Hamifleurs tramite sub-account Flowerex. Tutorial video, checklist pre-acquisto, FAQ e accesso al webshop.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HamifleursPage />;
}
