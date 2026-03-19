exports.handler = async (event) => {
  const appid = event.queryStringParameters?.appid;
  if (!appid) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing appid' }) };
  }

  try {
    const res = await fetch(`https://steamspy.com/api.php?request=appdetails&appid=${appid}`);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
