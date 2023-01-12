import { pool } from "../../../lib/db";
import { GetRoomsDTO, RoomModel } from "../../../types/room";

const text = "SELECT * FROM rooms WHERE id_room = $1";

async function getRoom({ id_room }: GetRoomsDTO) {
  try {
    const results = await pool.query<RoomModel>(text, [id_room]);

    return results.rows[0];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { error: e?.message };
    }
  }
  return { error: "Error desconocido" };
}

export { getRoom };
