import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text = "DELETE FROM songs WHERE id_song = $1 RETURNING *";

const deleteSong: NextApiHandler = async (req, res) => {
  const { id_song } = req.body;

  try {
    const results = await pool.query(text, [id_song]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default deleteSong;
