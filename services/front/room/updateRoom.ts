import { UpdateRoomDTO, UpdateRoomResponse } from "../../../types/room";

function updateRoom({ is_closed, current_song, id_room }: UpdateRoomDTO) {
  const ENDPOINT = `${location.origin}/api/room/update`;
  return fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_closed,
      current_song,
      id_room,
    }),
  })
    .then((response) => response.json())
    .then((response: UpdateRoomResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

export { updateRoom };
