import { UpdateRoomDTO, UpdateRoomResponse } from "../../../types/room";

function updateRoom({ id_room, is_closed, current_song }: UpdateRoomDTO) {
  const ENDPOINT = `${location.origin}/api/room/update`;
  return fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_room,
      is_closed,
      current_song,
    }),
  })
    .then((response) => response.json())
    .then((response: UpdateRoomResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

export { updateRoom };
