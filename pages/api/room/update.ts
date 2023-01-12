import { NextApiHandler } from "next";
import { updateRoom } from "../../../services/back/room/update";
import { UpdateRoomResponse } from "../../../types/room";

interface UpdateRoomRequest {
  id_room: number;
  is_closed: boolean;
  current_song: number;
}

const updateRoomEndpoint: NextApiHandler<UpdateRoomResponse> = async (
  req,
  res,
) => {
  try {
    const { is_closed, current_song, id_room } = req.body as UpdateRoomRequest;

    const results = await updateRoom({ is_closed, current_song, id_room });

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

export default updateRoomEndpoint;
