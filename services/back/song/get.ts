import { pool } from "../../../lib/db";
import { GetSongsDTO, SongModel } from "../../../types/song";

const text =
  "SELECT * FROM songs WHERE id_room = $1 ORDER BY votos DESC, id_song ASC";

async function getSongs({ id_room }: GetSongsDTO) {
  try {
    const results = await pool.query<SongModel>(text, [id_room]);
    return results.rows;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { getSongs };
