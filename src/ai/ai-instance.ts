import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_GENAI_API_KEY ?? '';
console.log('GOOGLE_API_KEY', GOOGLE_API_KEY);


export async function analyzeWithGemini(texto: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.post(endpoint, {
      contents: [
        {
          parts: [{ text: texto }],
        },
      ],
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No se obtuvo respuesta del modelo.'
    );
  } catch (error: any) {
    console.error('❌ Error al llamar a Gemini:', error?.response?.data || error);
    return 'Error al conectar con Gemini.';
  }
}
