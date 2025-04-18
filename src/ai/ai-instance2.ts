import { Genkit } from 'genkit';

export const ai = new Genkit({
  defaultModel: 'deepseek-chat',
  models: {
    'deepseek-chat': {
      service: 'openai.chat', // 👈 porque DeepSeek API es *compatible* con OpenAI format
      model: 'deepseek-chat', // 👈 el nombre del modelo que ofrece DeepSeek
      apiKey: 'sk-52e25b5377cd4ce0ae596764c5cb1363',
      baseUrl: 'https://api.deepseek.com',
    },
  },
});
