import { GetSongsDTO, GetSongResponse } from "../../../types/song";

async function getSongs({ id_room }: GetSongsDTO) {
  const ENDPOINT = `${location.origin}/api/song/get`;
  const response = await fetch(`${ENDPOINT}?id_room=${id_room}`);
  const data = (await response.json()) as GetSongResponse;
  if ("error" in data) throw new Error(data.error);
  return data;
}

export { getSongs };
