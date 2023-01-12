import { pool } from "../../../lib/db";
import slugify from "slugify";
import { CreateRoomDTO, RoomModel } from "../../../types/room";

const text =
  "INSERT INTO rooms(name_room, url_room) VALUES($1, $2) RETURNING *";

async function createRoom({ name_room }: CreateRoomDTO) {
  const url_room = slugify(name_room);
  try {
    const results = await pool.query<RoomModel>(text, [name_room, url_room]);

    return results.rows[0];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { createRoom };
