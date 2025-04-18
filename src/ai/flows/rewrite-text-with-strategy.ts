// @ts-nocheck
'use server';

/**
 * @fileOverview Rewrites text based on a selected writing strategy using Gemini API.
 */

import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_GENAI_API_KEY ?? '';

export type RewriteTextWithStrategyInput = {
  text: string;
  strategy: string;
};

export type RewriteTextWithStrategyOutput = {
  rewrittenText: string;
  explanation: string;
};

/**
 * Llama a Gemini para reescribir el texto con una estrategia específica.
 */
async function callGemini(prompt: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${GOOGLE_API_KEY}`;



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
  } catch (error) {
    console.error('Error al llamar a Gemini:', error);
    return 'Error al conectar con Gemini.';
  }
}

/**
 * Prompt principal para reescribir el texto.
 */
function buildRewritePrompt(text: string, strategy: string): string {
  return `Reescribe el siguiente texto aplicando la estrategia de escritura: "${strategy}". Mantén el significado original, pero mejora el estilo y el impacto según esa estrategia.\n\nTexto original:\n${text}`;
}

/**
 * Prompt para explicar los cambios realizados.
 */
function buildExplanationPrompt(original: string, rewritten: string, strategy: string): string {
  return `Explica los cambios hechos en el texto a continuación. Justifica por qué cada cambio mejora el texto según la estrategia de escritura "${strategy}".\n\nTexto original:\n${original}\n\nTexto reescrito:\n${rewritten}`;
}

/**
 * Función principal del flow.
 */
export async function rewriteTextWithStrategy(
  input: RewriteTextWithStrategyInput
): Promise<RewriteTextWithStrategyOutput> {
  const rewritePrompt = buildRewritePrompt(input.text, input.strategy);
  const rewrittenText = await callGemini(rewritePrompt);

  const explanationPrompt = buildExplanationPrompt(input.text, rewrittenText, input.strategy);
  const explanation = await callGemini(explanationPrompt);

  return {
    rewrittenText,
    explanation,
  };
}
