import prisma from "../../../lib/prismadb";
import { GetRoomsDTO } from "../../../types/room";

async function getRoom({ id_room }: GetRoomsDTO) {
  try {
    const results = prisma.rooms.findUnique({
      where: {
        id_room: parseInt(id_room),
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

export { getRoom };
