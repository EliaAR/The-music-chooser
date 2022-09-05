import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

interface UpdateRoomRequest {
  id_room: number;
  isclosed: boolean;
  currentsong: number;
}

export type UpdateRoomResponse = RoomModel | { error: string };

const text =
  "UPDATE rooms SET isclosed = $1, currentsong = $2 WHERE id_room = $3 RETURNING *";

const updateRoom: NextApiHandler<UpdateRoomResponse> = async (req, res) => {
  const { isclosed, currentsong, id_room } = req.body as UpdateRoomRequest;

  try {
    const results = await pool.query<RoomModel>(text, [
      isclosed,
      currentsong,
      id_room,
    ]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default updateRoom;
