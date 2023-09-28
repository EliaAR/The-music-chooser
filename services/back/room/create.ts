import prisma from "../../../lib/prismadb";
import slugify from "slugify";
import { CreateRoomDTO } from "../../../types/room";

async function createRoom({ name_room }: CreateRoomDTO) {
  const url_room = slugify(name_room);
  try {
    const results = await prisma.rooms.create({
      data: {
        name_room,
        url_room,
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

export { createRoom };
