import { pool } from "../../../lib/db";
import { fetchYoutubeData } from "../youtubedl/fetchYoutubeData";
import { CreateSongDTO, SongModel } from "../../../types/song";

const text =
  "INSERT INTO songs(id_room, name_song, url_song, img, audio) VALUES($1, $2,$3,$4,$5) RETURNING *";

async function createSong({ id_room, url_song }: CreateSongDTO) {
  try {
    const { name_song, img, audio } = await fetchYoutubeData(url_song);

    const results = await pool.query<SongModel>(text, [
      id_room,
      name_song,
      url_song,
      img,
      audio,
    ]);

    return results.rows[0];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { createSong };
