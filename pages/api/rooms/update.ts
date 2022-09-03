import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

interface UpdateRoomRequest {
  id_room: number;
  isclosed: boolean;
}

export type UpdateRoomResponse = RoomModel | { error: string };

const text = "UPDATE rooms SET isclosed = $1 WHERE id_room = $2 RETURNING *";

const updateRoom: NextApiHandler<UpdateRoomResponse> = async (req, res) => {
  const { isclosed, id_room } = req.body as UpdateRoomRequest;

  try {
    const results = await pool.query<RoomModel>(text, [isclosed, id_room]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default updateRoom;
