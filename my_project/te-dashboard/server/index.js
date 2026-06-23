import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.get("/api/data", async (req, res) => {
  const { country, indicator } = req.query;

  try {
    const response = await axios.get(
      `https://api.tradingeconomics.com/historical/country/${country}/indicator/${indicator}`,
      {
        params: {
          c: process.env.TE_KEY
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(
      `https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade`,
      {
        params: {
          q,
          pp: 50,
          p: 0,
          _: Date.now(),
          stance: 2,
          c: process.env.TE_KEY
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Search API error" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
