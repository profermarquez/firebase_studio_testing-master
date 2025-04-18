'use server';

/**
 * @fileOverview A text analysis AI agent that identifies areas for improvement using Gemini Pro.
 */

import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_GENAI_API_KEY ?? '';
const MODEL = 'gemini-1.5-pro-001';
export type AnalyzeTextForImprovementsInput = {
  text: string;
};

export type AnalyzeTextForImprovementsOutput = {
  analysis: string;
};

export async function callGemini(prompt: string, retries = 2): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.post(endpoint, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No se obtuvo respuesta del modelo.'
    );
  } catch (error: any) {
    const status = error?.response?.status;
    console.error(`❌ Error al llamar a Gemini (status ${status}):`, error?.response?.data || error);

    if (status === 503 && retries > 0) {
      console.log('🔁 Reintentando en 1s...');
      await new Promise(res => setTimeout(res, 1000));
      return callGemini(prompt, retries - 1);
    }

    return 'Error al conectar con Gemini.';
  }
}

export async function analyzeTextForImprovements(
  input: AnalyzeTextForImprovementsInput
): Promise<AnalyzeTextForImprovementsOutput> {
  const prompt = `Eres un experto en análisis de textos. Analiza el siguiente texto e identifica áreas claras de mejora en términos de **claridad**, **coherencia**, **persuasión** y **estilo**:\n\nTexto:\n${input.text}`;

  const analysis = await callGemini(prompt);

  return {
    analysis,
  };
}
