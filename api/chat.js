export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Pouze POST metoda je povolena.' });
  }

  const userMessage = req.body.message;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'Chybí OpenAI API klíč.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Jsi chytrý asistent zaměřený na reality na splátky, investice a auta.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json({ message: data.choices?.[0]?.message?.content || 'Žádná odpověď.' });
  } catch (error) {
    return res.status(500).json({ message: 'Chyba při komunikaci s OpenAI.' });
  }
}
