import { pool } from "../../../lib/db";
import { UpdateRoomDTO, RoomModel } from "../../../types/room";

const text =
  "UPDATE rooms SET is_closed = $1, current_song = $2 WHERE id_room = $3 RETURNING *";

async function updateRoom({ is_closed, current_song, id_room }: UpdateRoomDTO) {
  try {
    const results = await pool.query<RoomModel>(text, [
      is_closed,
      current_song,
      id_room,
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

export { updateRoom };
