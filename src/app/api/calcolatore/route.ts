import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Sei un assistente specializzato nell'estrazione di dati da fatture di fiori all'ingrosso olandesi (floricoltori, aste, grossisti come Hamifleurs, VBA, Royal FloraHolland, ecc.).

Il tuo compito: estrarre le righe prodotto dalla fattura fornita.

REGOLE:
- Estrai SOLO le righe che rappresentano prodotti/fiori acquistati
- Ignora intestazioni, totali, note di testo, dati fiscali
- Il campo "qty" è la quantità totale di steli/unità (es. "1 x 20" o "20" = 20 steli)
- Il campo "unitCost" è il prezzo per singolo stelo o unità (non per mazzo)
- Se vedi "1 x 20  20  Nome prodotto ... 1,57  31,40": qty=20, unitCost=1.57
- Il nome prodotto è il nome botanico/commerciale del fiore
- Usa il punto come separatore decimale nei numeri

Rispondi SOLO con JSON valido, senza testo prima o dopo:
{
  "products": [
    { "name": "Nome Prodotto", "qty": 20, "unitCost": 1.57 }
  ]
}`;

export interface CalcolatoreProduct {
  name: string;
  qty: number;
  unitCost: number;
  unitPrice: number;
  totalCost: number;
  totalPrice: number;
}

export interface CalcolatoreResult {
  products: CalcolatoreProduct[];
  grandTotalCost: number;
  grandTotalPrice: number;
}

type ImageMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY non configurata. Aggiungila nelle variabili d'ambiente." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  let body: {
    text?: string;
    imageBase64?: string;
    imageMediaType?: string;
    marginFixed?: number;
    marginPercent?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const {
    text,
    imageBase64,
    imageMediaType = "image/jpeg",
    marginFixed = 0.25,
    marginPercent = 33,
  } = body;

  if (!text && !imageBase64) {
    return NextResponse.json(
      { error: "Devi fornire testo oppure un'immagine della fattura." },
      { status: 400 }
    );
  }

  // Build message content
  type ContentBlock =
    | { type: "text"; text: string }
    | { type: "image"; source: { type: "base64"; media_type: ImageMediaType; data: string } };

  const content: ContentBlock[] = [];

  if (imageBase64) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: imageMediaType as ImageMediaType,
        data: imageBase64,
      },
    });
    content.push({
      type: "text",
      text: "Estrai le righe prodotto da questa fattura. Rispondi solo con JSON valido.",
    });
  } else {
    content.push({
      type: "text",
      text: `Estrai le righe prodotto da questo testo di fattura. Rispondi solo con JSON valido.\n\n${text}`,
    });
  }

  let parsedProducts: { name: string; qty: number; unitCost: number }[] = [];

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const rawText = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    // Extract JSON object from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Claude non ha restituito un JSON valido. Riprova con un testo più leggibile." },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    parsedProducts = parsed.products ?? [];

    if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
      return NextResponse.json(
        { error: "Nessun prodotto trovato nella fattura. Verifica il testo o l'immagine." },
        { status: 422 }
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Errore Claude API: ${msg}` }, { status: 500 });
  }

  // Apply margins: customer_price = cost * (1 + percent/100) + fixed
  const products: CalcolatoreProduct[] = parsedProducts.map((p) => {
    const cost = Number(p.unitCost) || 0;
    const qty = Number(p.qty) || 1;
    const unitPrice = cost * (1 + marginPercent / 100) + marginFixed;
    const totalCost = qty * cost;
    const totalPrice = qty * unitPrice;
    return {
      name: p.name,
      qty,
      unitCost: round2(cost),
      unitPrice: round2(unitPrice),
      totalCost: round2(totalCost),
      totalPrice: round2(totalPrice),
    };
  });

  const grandTotalCost = round2(products.reduce((s, p) => s + p.totalCost, 0));
  const grandTotalPrice = round2(products.reduce((s, p) => s + p.totalPrice, 0));

  return NextResponse.json({ products, grandTotalCost, grandTotalPrice });
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
