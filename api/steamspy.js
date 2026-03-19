export default async function handler(req, res) {
  const { appid } = req.query;
  if (!appid) return res.status(400).json({ error: 'Missing appid' });

  try {
    const [playerRes, spyRes] = await Promise.all([
      fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`),
      fetch(`https://steamspy.com/api.php?request=appdetails&appid=${appid}`)
    ]);

    const playerData = await playerRes.json();
    const spyData = await spyRes.json();

    const result = {
      ccu: playerData?.response?.player_count ?? 0,
      owners: spyData?.owners ?? '—',
      peak_2w: spyData?.peak_2w ?? 0,
      positive: spyData?.positive ?? 0,
      negative: spyData?.negative ?? 0,
      average_2weeks: spyData?.average_2weeks ?? 0,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
