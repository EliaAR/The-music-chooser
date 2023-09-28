import { rooms } from "@prisma/client";

export type RoomModel = rooms;

export interface CreateRoomDTO {
  name_room: string;
}

export type CreateRoomResponse = RoomModel | { error: string };

export interface GetRoomsDTO {
  id_room: string;
}

export type GetRoomResponse = RoomModel | { error: string };

export interface UpdateRoomDTO {
  is_closed: boolean;
  current_song?: number;
  id_room: number;
}

export type UpdateRoomResponse = RoomModel | { error: string };
