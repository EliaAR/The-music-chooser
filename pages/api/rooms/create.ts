import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text =
  "INSERT INTO rooms(name_room, url_room) VALUES($1, $2) RETURNING *";

const insertRoom: NextApiHandler = async (req, res) => {
  const { name_room, url_room } = req.body;

  try {
    if (!name_room) {
      return res
        .status(400)
        .json({ error: "Debes introducir un nombre para la Sala" });
    }

    const results = await pool.query(text, [name_room, url_room]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default insertRoom;
