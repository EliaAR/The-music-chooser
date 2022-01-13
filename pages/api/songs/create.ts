import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";

const text =
  "INSERT INTO songs(id_room, name_song, url_song) VALUES($1, $2, $3) RETURNING *";

const insertSong: NextApiHandler = async (req, res) => {
  const { id_room, name_song, url_song } = req.body;

  try {
    if (!id_room || !name_song || !url_song) {
      return res
        .status(400)
        .json({ message: "`name_song` and `url_song` are both required" });
    }

    const results = await pool.query(text, [id_room, name_song, url_song]);

    return res.json(results);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e?.message });
  }
};

export default insertSong;
