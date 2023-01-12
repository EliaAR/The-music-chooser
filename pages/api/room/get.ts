import { NextApiHandler } from "next";
import { getRoom } from "../../../services/back/room/get";
import { GetRoomResponse, GetRoomsDTO } from "../../../types/room";

const selectRoom: NextApiHandler<GetRoomResponse> = async (req, res) => {
  try {
    const { id_room } = req.query as unknown as GetRoomsDTO;
    const results = await getRoom({ id_room });

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

export default selectRoom;
