import prisma from "../../../lib/prismadb";
import { UpdateSongDTO } from "../../../types/song";

async function updateSong({ votos, id_song }: UpdateSongDTO) {
  try {
    const results = await prisma.songs.update({
      where: {
        id_song,
      },
      data: {
        votos,
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

export { updateSong };
