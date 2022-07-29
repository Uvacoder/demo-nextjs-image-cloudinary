const psi = require('psi');

export default async function handler(req, res) {
  const { url } = JSON.parse(req.body);

  const { data } = await psi(url, {
    key: process.env.GOOGLE_API_KEY
  });

  res.status(200).json(data);
}
