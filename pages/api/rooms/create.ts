import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text =
  "INSERT INTO rooms(name_room, url_room) VALUES($1, $2) RETURNING *";

const insertRoom: NextApiHandler = async (req, res) => {
  const { name_room, url_room } = req.body;

  try {
    if (!name_room || !url_room) {
      return res
        .status(400)
        .json({ message: "`name_room` and `url_room` are both required" });
    }

    const results = await pool.query(text, [name_room, url_room]);

    return res.json(results);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e?.message });
  }
};

export default insertRoom;
