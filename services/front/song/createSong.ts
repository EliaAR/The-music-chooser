import { CreateSongDTO, CreateSongResponse } from "../../../types/song";

async function createSong({ id_room, url_song }: CreateSongDTO) {
  const ENDPOINT = `${location.origin}/api/song/create`;
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_room,
      url_song,
    }),
  });
  const data = (await response.json()) as CreateSongResponse;
  if ("error" in data) throw new Error(data.error);
  return data;
}

export { createSong };
