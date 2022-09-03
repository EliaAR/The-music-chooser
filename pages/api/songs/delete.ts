import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { SongModel } from "../../../types/model";

interface DeleteSongRequest {
  id_song: number;
}

export type DeleteSongResponse = SongModel | { error: string };

const text = "DELETE FROM songs WHERE id_song = $1 RETURNING *";

const deleteSong: NextApiHandler<DeleteSongResponse> = async (req, res) => {
  const { id_song } = req.body as DeleteSongRequest;

  try {
    const results = await pool.query<SongModel>(text, [id_song]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default deleteSong;
