import { NextResponse } from 'next/server'

export async function POST(req) {
  const { title } = await req.json()

  const prompt = `Write a high-quality, human-like blog post about "${title}". Include an intro, two key points, and a conclusion. Make it 500–600 words.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    )

    const data = await response.json()

    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!content) {
      return NextResponse.json({ error: 'Failed to generate content.' }, { status: 500 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
