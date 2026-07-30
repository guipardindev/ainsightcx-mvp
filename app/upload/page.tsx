import type { Metadata } from "next";

import { UploadClient } from "./upload-client";

export const metadata: Metadata = {
  title: "Enviar interações",
  description:
    "Envie um CSV de interações de atendimento ou use o dataset de exemplo para ver o AInsightCX funcionando.",
};

export default function UploadPage() {
  return <UploadClient />;
}
