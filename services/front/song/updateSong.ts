import { UpdateSongDTO, UpdateSongResponse } from "../../../types/song";

async function updateSong({ votos, id_song }: UpdateSongDTO) {
  const ENDPOINT = `${location.origin}/api/song/update`;

  const response = await fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votos,
      id_song,
    }),
  });
  const data = (await response.json()) as UpdateSongResponse;
  if ("error" in data) throw new Error(data.error);
  return data;
}

export { updateSong };
