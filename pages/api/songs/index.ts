import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { SongModel } from "../../../types/model";

export type GetSongResponse = SongModel[] | { error: string };

const text = "SELECT * FROM songs WHERE id_room = $1 ORDER BY votos DESC";

const selectTableSongs: NextApiHandler<GetSongResponse> = async (req, res) => {
  const { id_room } = req.query;

  try {
    const results = await pool.query<SongModel>(text, [id_room]);

    return res.json(results.rows);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default selectTableSongs;
