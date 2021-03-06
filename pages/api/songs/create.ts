import { NextApiHandler } from "next";
import { pool } from "../../../lib/db";
import youtubedl from "youtube-dl-exec";

const text =
  "INSERT INTO songs(id_room, name_song, url_song, img, audio) VALUES($1, $2,$3,$4,$5) RETURNING *";

const insertSong: NextApiHandler = async (req, res) => {
  const { id_room, url_song } = req.body;

  try {
    if (!url_song) {
      return res
        .status(400)
        .json({ error: "Introduzca una URL de Youtube válida" });
    }

    const youtubeData = await youtubedl(url_song, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    const name_song = youtubeData.title;
    const img = youtubeData.thumbnails[0].url;
    const audio = youtubeData.formats[0].url;

    const results = await pool.query(text, [
      id_room,
      name_song,
      url_song,
      img,
      audio,
    ]);

    return res.json(results.rows[0]);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message });
  }
};

export default insertSong;
