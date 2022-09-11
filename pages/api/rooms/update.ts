import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

interface UpdateRoomRequest {
  id_room: number;
  is_closed: boolean;
  current_song: number;
}

export type UpdateRoomResponse = RoomModel | { error: string };

const text =
  "UPDATE rooms SET is_closed = $1, current_song = $2 WHERE id_room = $3 RETURNING *";

const updateRoom: NextApiHandler<UpdateRoomResponse> = async (req, res) => {
  const { is_closed, current_song, id_room } = req.body as UpdateRoomRequest;

  try {
    const results = await pool.query<RoomModel>(text, [
      is_closed,
      current_song,
      id_room,
    ]);

    return res.json(results.rows[0]);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json({ error: e?.message });
    }
  }
};

export default updateRoom;
