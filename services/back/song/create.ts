import prisma from "../../../lib/prismadb";
import { fetchYoutubeData } from "../youtubedl/fetchYoutubeData";
import { CreateSongDTO } from "../../../types/song";

async function createSong({ id_room, url_song }: CreateSongDTO) {
  try {
    const { name_song, img, audio, expire } = await fetchYoutubeData(url_song);

    const results = await prisma.songs.create({
      data: {
        id_room,
        name_song,
        url_song,
        img,
        audio,
        expire,
      },
    });

    return results;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { createSong };
