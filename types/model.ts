export interface RoomModel {
  id_room: number;
  name_room: string;
  url_room: string;
}

export interface SongModel {
  id_song: number;
  id_room: number;
  name_song: string;
  url_song: string;
}