import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text = "UPDATE songs SET votos = $1 WHERE id_song = $2 RETURNING *";

const deleteSong: NextApiHandler = async (req, res) => {
  const { votos, id_song } = req.body;

  try {
    const results = await pool.query(text, [votos, id_song]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default deleteSong;
