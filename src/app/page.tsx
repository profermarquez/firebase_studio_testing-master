"use client";

import {AnalyzeTextForm} from "@/components/AnalyzeTextForm";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          TextoMaestro - AI Text Improver
        </h1>
        <AnalyzeTextForm />
      </div>
      <Toaster />
    </div>
  );
}
