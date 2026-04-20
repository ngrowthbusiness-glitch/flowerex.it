import type { Metadata } from "next";
import ConsegnePage from "@/components/consegne/ConsegnePage";

export const metadata: Metadata = {
  title: "Tempi di Consegna | Flowerex",
  description:
    "Scopri quando fare l'ordine per ricevere i fiori in tempo per il tuo evento. Timeline chiara dalla finestra d'ordine alla consegna a Polverigi (AN).",
};

export default function Page() {
  return <ConsegnePage />;
}
