import slugify from "slugify";
import { RoomModel, SongModel } from "../types/model";

interface createRoomProps {
  nameRoom: string;
}

interface getRoomsProps {
  id: string;
}

interface updateRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

interface getSongsProps {
  id: string | number;
}

interface createSongProps {
  idRoom: string | number;
  urlSong: string;
}

interface updateSongProps {
  votos: number;
  idSong: number;
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

function updateRoom({ isClosed, idRoom }: updateRoomProps) {
  const ENDPOINT = location.origin + "/api/rooms/update";
  return fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isclosed: isClosed,
      id_room: idRoom,
    }),
  })
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

function createSong({ idRoom, urlSong }: createSongProps): Promise<SongModel> {
  const ENDPOINT = location.origin + "/api/songs/create";
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_room: idRoom,
      url_song: urlSong,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
}

function updateSong({ votos, idSong }: updateSongProps): Promise<SongModel> {
  const ENDPOINT = location.origin + "/api/songs/update";

  return fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votos,
      id_song: idSong,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
}

export { createRoom, getRoom, updateRoom, getSongs, createSong, updateSong };
