import { songs } from "@prisma/client";

export type SongModel = songs;
export interface CreateSongDTO {
  id_room: number;
  url_song: string;
}

export type CreateSongResponse = SongModel | { error: string };

export interface GetSongsDTO {
  id_room: string;
}

export type GetSongResponse = SongModel[] | { error: string };

export interface UpdateSongDTO {
  votos?: number;
  audio?: string;
  expire?: number;
  id_song: number;
}

export type UpdateSongResponse = SongModel | { error: string };
