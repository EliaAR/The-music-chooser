import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

export type GetRoomResponse = RoomModel | { error: string };

const text = "SELECT * FROM rooms WHERE id_room = $1";

const selectTableRooms: NextApiHandler<GetRoomResponse> = async (req, res) => {
  const { id_room } = req.query;

  try {
    const results = await pool.query<RoomModel>(text, [id_room]);

    return res.json(results.rows[0]);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json({ error: e?.message });
    }
  }
};

export default selectTableRooms;
