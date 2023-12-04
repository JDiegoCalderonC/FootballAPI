import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; //

const app = express();
const PORT = 3000;

app.use(cors());


app.get('/nextMatch/:teamId', async (req, res) => {
  try {
    const apiKey = '44aac858688742ea8cdc043331cce68e';
    const teamId = req.params.teamId;

    const response = await fetch(`https://api.football-data.org/v2/teams/${teamId}/matches?status=SCHEDULED`, {
      headers: {
        'X-Auth-Token': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const nextMatch = data.matches[0];
    res.json(nextMatch);
  } catch (error) {
    console.error(`Error fetching next match for team ${req.params.teamId}:`, error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
