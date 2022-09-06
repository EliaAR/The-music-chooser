export interface RoomModel {
  id_room: number;
  name_room: string;
  url_room: string;
  is_closed: boolean;
  current_song: number | null;
}

export interface SongModel {
  id_song: number;
  id_room: number;
  name_song: string;
  url_song: string;
  img: string;
  audio: string;
  votos: number;
}
