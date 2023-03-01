import { GetRoomsDTO, GetRoomResponse } from "../../../types/room";

async function getRoom({ id_room }: GetRoomsDTO) {
  const ENDPOINT = `${location.origin}/api/room/get`;
  const response = await fetch(`${ENDPOINT}?id_room=${id_room}`);
  const data = (await response.json()) as GetRoomResponse;

  if ("error" in data) throw new Error(data.error);
  return data;
}

export { getRoom };
