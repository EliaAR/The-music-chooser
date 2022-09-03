import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { SongModel } from "../../../types/model";

interface UpdateSongRequest {
  votos: number;
  id_song: number;
}

export type UpdateSongResponse = SongModel | { error: string };

const text = "UPDATE songs SET votos = $1 WHERE id_song = $2 RETURNING *";

const updateSong: NextApiHandler<UpdateSongResponse> = async (req, res) => {
  const { votos, id_song } = req.body as UpdateSongRequest;

  try {
    const results = await pool.query<SongModel>(text, [votos, id_song]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default updateSong;
