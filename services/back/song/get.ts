import prisma from "../../../lib/prismadb";
import { GetSongsDTO } from "../../../types/song";

async function getSongs({ id_room }: GetSongsDTO) {
  try {
    const results = await prisma.songs.findMany({
      where: {
        id_room: parseInt(id_room),
      },
      orderBy: [
        {
          votos: "desc",
        },
        {
          id_song: "asc",
        },
      ],
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

export { getSongs };
