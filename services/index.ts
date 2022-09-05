import slugify from "slugify";
import { GetRoomResponse } from "../pages/api/rooms";
import { CreateRoomResponse } from "../pages/api/rooms/create";
import { UpdateRoomResponse } from "../pages/api/rooms/update";
import { GetSongResponse } from "../pages/api/songs";
import { CreateSongResponse } from "../pages/api/songs/create";
import { UpdateSongResponse } from "../pages/api/songs/update";
import { RoomModel, SongModel } from "../types/model";

interface CreateRoomProps {
  nameRoom: string;
}

interface GetRoomsProps {
  id: string;
}

interface UpdateRoomProps {
  isClosed: boolean;
  idRoom: string | number;
  currentsong?: number;
}

interface GetSongsProps {
  id: string | number;
}

interface CreateSongProps {
  idRoom: string | number;
  urlSong: string;
}

interface UpdateSongProps {
  votos: number;
  idSong: number;
}

function createRoom({ nameRoom }: CreateRoomProps): Promise<RoomModel> {
  const ENDPOINT = location.origin + "/api/rooms/create";

  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name_room: nameRoom, url_room: slugify(nameRoom) }),
  })
    .then((response) => response.json())
    .then((response: CreateRoomResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

function getRoom({ id }: GetRoomsProps): Promise<RoomModel> {
  const ENDPOINT = location.origin + "/api/rooms";
  return fetch(ENDPOINT + "?id_room=" + id)
    .then((response) => response.json())
    .then((response: GetRoomResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

function updateRoom({
  isClosed,
  idRoom,
  currentsong,
}: UpdateRoomProps): Promise<RoomModel> {
  const ENDPOINT = location.origin + "/api/rooms/update";
  return fetch(ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isclosed: isClosed,
      id_room: idRoom,
      currentsong: currentsong,
    }),
  })
    .then((response) => response.json())
    .then((response: UpdateRoomResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

function getSongs({ id }: GetSongsProps): Promise<SongModel[]> {
  const ENDPOINT = location.origin + "/api/songs";
  return fetch(`${ENDPOINT}?id_room=${id}`)
    .then((response) => response.json())
    .then((response: GetSongResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

function createSong({ idRoom, urlSong }: CreateSongProps): Promise<SongModel> {
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
    .then((response: CreateSongResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

function updateSong({ votos, idSong }: UpdateSongProps): Promise<SongModel> {
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
    .then((response: UpdateSongResponse) => {
      if ("error" in response) throw new Error(response.error);
      return response;
    });
}

export { createRoom, getRoom, updateRoom, getSongs, createSong, updateSong };
