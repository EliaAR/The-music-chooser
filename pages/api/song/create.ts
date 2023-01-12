import { NextApiHandler } from "next";
import { createSong } from "../../../services/back/song/create";
import { CreateSongDTO, CreateSongResponse } from "../../../types/song";

const insertSong: NextApiHandler<CreateSongResponse> = async (req, res) => {
  try {
    const { id_room, url_song } = req.body as CreateSongDTO;
    if (!url_song) {
      return res
        .status(400)
        .json({ error: "Introduzca una URL de Youtube válida" });
    }

    const results = await createSong({ id_room, url_song });

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

export default insertSong;
