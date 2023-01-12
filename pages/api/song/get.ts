import { NextApiHandler } from "next";
import { getSongs } from "../../../services/back/song/get";
import { GetSongResponse, GetSongsDTO } from "../../../types/song";

const selectSongs: NextApiHandler<GetSongResponse> = async (req, res) => {
  try {
    const { id_room } = req.query as unknown as GetSongsDTO;
    const results = await getSongs({ id_room });

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

export default selectSongs;
