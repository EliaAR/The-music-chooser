export interface SongModel {
  id_song: number;
  id_room: number;
  name_song: string;
  url_song: string;
  img: string;
  audio: string;
  votos: number;
}

export interface CreateSongDTO {
  id_room: number;
  url_song: string;
}

export type CreateSongResponse = SongModel | { error: string };

export interface GetSongsDTO {
  id_room: number;
}

export type GetSongResponse = SongModel[] | { error: string };

export interface UpdateSongDTO {
  votos: number;
  id_song: number;
}

export type UpdateSongResponse = SongModel | { error: string };
