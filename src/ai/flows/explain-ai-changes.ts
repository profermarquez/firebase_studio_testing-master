// src/ai/flows/explain-ai-changes.ts
'use server';
/**
 * @fileOverview Explains the changes made by the AI to the text, justifying why each change improves the text according to the selected writing strategy.
 *
 * - explainAiChanges - A function that handles the explanation of AI changes.
 * - ExplainAiChangesInput - The input type for the explainAiChanges function.
 * - ExplainAiChangesOutput - The return type for the explainAiChanges function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainAiChangesInputSchema = z.object({
  originalText: z.string().describe('The original text.'),
  rewrittenText: z.string().describe('The AI-rewritten text.'),
  writingStrategy: z.string().describe('The writing strategy applied to the text.'),
});
export type ExplainAiChangesInput = z.infer<typeof ExplainAiChangesInputSchema>;

const ExplainAiChangesOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the changes made by the AI.'),
});
export type ExplainAiChangesOutput = z.infer<typeof ExplainAiChangesOutputSchema>;

export async function explainAiChanges(input: ExplainAiChangesInput): Promise<ExplainAiChangesOutput> {
  return explainAiChangesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAiChangesPrompt',
  input: {
    schema: z.object({
      originalText: z.string().describe('The original text.'),
      rewrittenText: z.string().describe('The AI-rewritten text.'),
      writingStrategy: z.string().describe('The writing strategy applied to the text.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The explanation of the changes made by the AI.'),
    }),
  },
  prompt: `You are an AI text improvement expert. You will receive an original text, a rewritten text, and the writing strategy that was used to rewrite the text. Your job is to explain the changes that were made to the text, justifying why each change improves the text according to the selected writing strategy.

Original Text: {{{originalText}}}
Rewritten Text: {{{rewrittenText}}}
Writing Strategy: {{{writingStrategy}}}

Explanation: `,
});

const explainAiChangesFlow = ai.defineFlow<
  typeof ExplainAiChangesInputSchema,
  typeof ExplainAiChangesOutputSchema
>({
  name: 'explainAiChangesFlow',
  inputSchema: ExplainAiChangesInputSchema,
  outputSchema: ExplainAiChangesOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
