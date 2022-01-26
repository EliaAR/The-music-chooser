import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text = "SELECT * FROM rooms WHERE id_room = $1";

const selectTableRooms: NextApiHandler = async (req, res) => {
  const { id_room } = req.query;

  try {
    const results = await pool.query(text, [id_room]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default selectTableRooms;
