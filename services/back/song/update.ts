import { pool } from "../../../lib/db";
import { SongModel, UpdateSongDTO } from "../../../types/song";

const text = "UPDATE songs SET votos = $1 WHERE id_song = $2 RETURNING *";

async function updateSong({ votos, id_song }: UpdateSongDTO) {
  try {
    const results = await pool.query<SongModel>(text, [votos, id_song]);

    return results.rows[0];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { updateSong };
