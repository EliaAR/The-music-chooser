import { CreateRoomDTO, CreateRoomResponse } from "../../../types/room";

async function createRoom({ name_room }: CreateRoomDTO) {
  const ENDPOINT = `${location.origin}/api/room/create`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name_room }),
  });
  const data = (await response.json()) as CreateRoomResponse;
  if ("error" in data) throw new Error(data.error);
  return data;
}

export { createRoom };
