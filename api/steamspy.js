export default async function handler(req, res) {
  const { appid } = req.query;
  if (!appid) return res.status(400).json({ error: 'Missing appid' });

  try {
    const response = await fetch(`https://steamspy.com/api.php?request=appdetails&appid=${appid}`);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
