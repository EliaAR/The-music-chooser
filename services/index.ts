import slugify from "slugify";

interface createRoomProps {
  nameRoom: string;
}

// function getSongs() {
//   const ENDPOINT = location.origin + "/api/songs?id_room=1";
//   return fetch(ENDPOINT).then((response) => response.json());
// }

function createRoom({ nameRoom }: createRoomProps) {
  const ENDPOINT = location.origin + "/api/rooms/create";
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name_room: nameRoom, url_room: slugify(nameRoom) }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
}

export { createRoom };
