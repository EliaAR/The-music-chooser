import { useState, useEffect } from "react";
import { getRoom, getSongs, createSong } from "../services/index";
import { GetLocalStorage } from "../services/localStorage";
import { RoomModel, SongModel } from "../types/model";

interface UseRoomDataProps {
  id: string | string[] | undefined;
}

interface UseRoomDataResult {
  room: RoomModel | undefined;
  setFetchRoom: React.Dispatch<React.SetStateAction<boolean>>;
  setCallAPIPost: React.Dispatch<React.SetStateAction<boolean>>;
  setCallAPIGet: React.Dispatch<React.SetStateAction<boolean>>;
  urlSong: string;
  setUrlSong: React.Dispatch<React.SetStateAction<string>>;
  songs: SongModel[];
  idVotadas: number[];
  setIdVotadas: React.Dispatch<React.SetStateAction<number[]>>;
  isAdmin: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  indexCurrentSong: number;
  currentSong: SongModel;
}

function useRoomData({ id }: UseRoomDataProps): UseRoomDataResult {
  const [room, setRoom] = useState<RoomModel | undefined>();
  const [fetchRoom, setFetchRoom] = useState(true);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [urlSong, setUrlSong] = useState("");
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [idVotadas, setIdVotadas] = useState([] as number[]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const indexCurrentSong = songs.findIndex(
    (song) => song.id_song === room?.current_song,
  );

  const currentSong = songs[indexCurrentSong];

  //   Obtener Room. fetchRoom → semáforo de Admin en botón de cerrar/abrir votaciones y sala + botones retroceder avanzar canción
  useEffect(() => {
    if (fetchRoom) {
      if (id && typeof id === "string")
        getRoom({ id }).then((data) => {
          setRoom(data);
          setFetchRoom(false);
        });
    }
  }, [fetchRoom, id]);

  // Obtener los datos de localStorage de idVotadas e isAdmin
  useEffect(() => {
    const localStorageData = GetLocalStorage<number[]>({
      key: "idVotadas",
      defaultValue: [],
    });
    setIdVotadas(localStorageData);
    const localStorageIsAdmins = GetLocalStorage<number[]>({
      key: "idsAdmin",
      defaultValue: [],
    });
    if (room && localStorageIsAdmins.includes(room.id_room)) {
      setIsAdmin(true);
    }
  }, [room]);

  //Obtener canciones. callAPIGet → semáforo desde CardSong cuando se votan canciones (handleVote→handleUpdateSong→onVoteSuccess)
  useEffect(() => {
    if (callAPIGet && room) {
      setCallAPIGet(false);
      getSongs({ id: room.id_room })
        .then((data) => setSongs(data))
        .catch((err) => console.log(err));
    }
  }, [callAPIGet, id, room]);

  // Crear canción. callAPIPost → semáforo desde AddSongInput cuando se añade una canción (onClickCallAPIPost) ... Semáforo CallGetAPI
  useEffect(() => {
    if (callAPIPost && room) {
      setError("");
      setCallAPIPost(false);
      createSong({ idRoom: room.id_room, urlSong })
        .then((data) => {
          console.log(data);
          setCallAPIGet(true);
          setUrlSong("");
        })
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
            console.error(err);
          }
        });
    }
  }, [callAPIPost, id, urlSong, room]);

  return {
    room,
    setFetchRoom,
    setCallAPIPost,
    setCallAPIGet,
    urlSong,
    setUrlSong,
    songs,
    idVotadas,
    setIdVotadas,
    isAdmin,
    error,
    setError,
    indexCurrentSong,
    currentSong,
  };
}

export { useRoomData };
