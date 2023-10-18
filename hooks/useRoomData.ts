import { useState, useEffect, FormEventHandler } from "react";
import { getRoom } from "../services/front/room/getRoom";
import { createSong } from "../services/front/song/createSong";
import { getSongs } from "../services/front/song/getSongs";
import { GetLocalStorage } from "../utils/localStorage";
import { RoomModel } from "../types/room";
import { SongModel } from "../types/song";

interface UseRoomDataProps {
  roomServer: RoomModel;
}

interface UseRoomDataResult {
  room: RoomModel;
  isLoading: boolean;
  setFetchRoom: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitSong: FormEventHandler<HTMLDivElement>;
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
  currentSong: SongModel | undefined;
  asyncReloadRoomData: () => Promise<void>;
}

function useRoomData({ roomServer }: UseRoomDataProps): UseRoomDataResult {
  const [room, setRoom] = useState<RoomModel>(roomServer);
  const [fetchRoom, setFetchRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSubmitSong: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setCallAPIPost(true);
  };

  //   Obtener Room. fetchRoom → semáforo de Admin en botón de cerrar/abrir votaciones y sala + botones retroceder avanzar canción
  const asyncReloadRoomData = async () =>
    getRoom({ id_room: roomServer.id_room.toString() })
      .then((data) => {
        setRoom(data);
        setFetchRoom(false);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
          console.error(err);
        }
      });

  useEffect(() => {
    if (fetchRoom) {
      asyncReloadRoomData();
    }
  }, [fetchRoom, roomServer]);

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
    setIsLoading(false);
  }, [room]);

  //Obtener canciones. callAPIGet → semáforo desde CardSong cuando se votan canciones (handleVote→handleUpdateSong→onVoteSuccess)
  useEffect(() => {
    if (callAPIGet && room) {
      setCallAPIGet(false);
      getSongs({ id_room: room.id_room.toString() })
        .then((data) => setSongs(data))
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
            console.error(err);
          }
        });
    }
  }, [callAPIGet, room]);

  // Crear canción. callAPIPost → semáforo desde AddSongInput cuando se añade una canción (onClickCallAPIPost) ... Semáforo CallGetAPI
  useEffect(() => {
    if (callAPIPost && room) {
      setError("");
      setCallAPIPost(false);
      createSong({ id_room: room.id_room, url_song: urlSong })
        .then(() => {
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
  }, [callAPIPost, urlSong, room]);

  return {
    room,
    isLoading,
    setFetchRoom,
    handleSubmitSong,
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
    asyncReloadRoomData,
  };
}

export { useRoomData };
