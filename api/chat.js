export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  const API_BASE = process.env.API_BASE || 'https://api.siliconflow.cn/v1';
  const API_KEY = process.env.API_KEY;
  const API_MODEL = process.env.API_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

  if (!API_KEY) {
    return res.status(500).json({ error: '服务端未配置 API_KEY' });
  }

  try {
    const { messages } = req.body;
    const r = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: API_MODEL,
        messages,
        temperature: 0.8,
        max_tokens: 300,
        top_p: 0.9
      })
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: text });
    }

    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
