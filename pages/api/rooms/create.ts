import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import { RoomModel } from "../../../types/model";

interface CreateRoomRequest {
  name_room: string;
  url_room: string;
}

export type CreateRoomResponse = RoomModel | { error: string };

const text =
  "INSERT INTO rooms(name_room, url_room) VALUES($1, $2) RETURNING *";

const insertRoom: NextApiHandler<CreateRoomResponse> = async (req, res) => {
  const { name_room, url_room } = req.body as CreateRoomRequest;

  try {
    if (!name_room) {
      return res
        .status(400)
        .json({ error: "Debes introducir un nombre para la Sala" });
    }

    const results = await pool.query<RoomModel>(text, [name_room, url_room]);

    return res.json(results.rows[0]);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json({ error: e?.message });
    }
  }
};

export default insertRoom;
