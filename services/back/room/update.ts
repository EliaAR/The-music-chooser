import prisma from "../../../lib/prismadb";
import { UpdateRoomDTO } from "../../../types/room";

async function updateRoom({ id_room, is_closed, current_song }: UpdateRoomDTO) {
  try {
    const results = await prisma.rooms.update({
      where: {
        id_room,
      },
      data: {
        is_closed,
        current_song,
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

export { updateRoom };
