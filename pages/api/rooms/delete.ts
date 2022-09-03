import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

interface DeleteRoomRequest {
  id_room: number;
}

export type DeleteRoomResponse = RoomModel | { error: string };

const text = "DELETE FROM rooms WHERE id_room = $1 RETURNING *";

const deleteRoom: NextApiHandler<DeleteRoomResponse> = async (req, res) => {
  const { id_room } = req.body as DeleteRoomRequest;

  try {
    const results = await pool.query<RoomModel>(text, [id_room]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default deleteRoom;
