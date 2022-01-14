import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text = "SELECT * FROM songs WHERE id_room = $1";
const selectTableSongs: NextApiHandler = async (req, res) => {
  const { id_room } = req.query;
  try {
    const results = await pool.query(text, [id_room]);
    return res.json(results);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e?.message });
  }
};

export default selectTableSongs;