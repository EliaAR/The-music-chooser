import slugify from "slugify";
import { RoomModel, SongModel } from "../types/model";

interface createRoomProps {
  nameRoom: string;
}

interface getRoomsProps {
  id: string;
}

interface getSongsProps {
  id: string | number;
}

function createRoom({ nameRoom }: createRoomProps): Promise<RoomModel> {
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

function getRoom({ id }: getRoomsProps): Promise<RoomModel> {
  const ENDPOINT = location.origin + "/api/rooms";
  return fetch(ENDPOINT + "?id_room=" + id)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
}

function getSongs({ id }: getSongsProps): Promise<SongModel[]> {
  const ENDPOINT = location.origin + "/api/songs";
  return fetch(ENDPOINT + "?id_room=" + id)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
}

export { createRoom, getRoom, getSongs };
