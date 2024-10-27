'use server'
export type GeminiResponse = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: string
            }
          ],
        },
      }
    ],
  };

export async function Gemini(query: string): Promise<GeminiResponse> {
    const prompt = {
      contents: [
        {
          parts: [
            {
              text: query
            }
          ]
        }
      ]
    }
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=AIzaSyCHEoYH-4sNFzzGHIGV0-OcuZMr2Qca91E', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(prompt)
      })
    return response.json()
  }