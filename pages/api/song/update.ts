import { NextApiHandler } from "next";
import { updateSong } from "../../../services/back/song/update";
import { UpdateSongResponse, UpdateSongDTO } from "../../../types/song";

const updateSongEndpoint: NextApiHandler<UpdateSongResponse> = async (
  req,
  res,
) => {
  try {
    const { votos, id_song } = req.body as UpdateSongDTO;

    const results = await updateSong({ votos, id_song });

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

export default updateSongEndpoint;
