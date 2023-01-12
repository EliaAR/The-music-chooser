import { NextApiHandler } from "next";
import { createRoom } from "../../../services/back/room/create";
import { CreateRoomResponse, CreateRoomDTO } from "../../../types/room";

const insertRoom: NextApiHandler<CreateRoomResponse> = async (req, res) => {
  try {
    const { name_room } = req.body as CreateRoomDTO;
    if (!name_room) {
      return res
        .status(400)
        .json({ error: "Debes introducir un nombre para la Sala" });
    }

    const results = await createRoom({ name_room });

    if ("error" in results) {
      return res.status(400).json({ error: results.error });
    }

    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json({ error: e?.message });
    }
  }
};

export default insertRoom;
