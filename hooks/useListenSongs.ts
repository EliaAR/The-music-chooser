import { useState, useEffect, useRef, useCallback } from "react";
import { updateRoom } from "../services/front/room/updateRoom";
import { SongModel } from "../types/song";
import { RoomModel } from "../types/room";

interface useListenSongsProps {
  asyncReloadRoomData: () => Promise<void>;
  song: SongModel | undefined;
  songs: SongModel[];
  indexCurrentSong: number;
  onUpdateRoom: (err: string) => void;
  roomData: RoomModel;
}

interface useListenSongsResult {
  progressTrack: number;
  duration: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeScrub: (event: Event, value: number | number[]) => void;
  handleChangeScrubEnd: () => void;
  handleUpdateCurrentSongDB: (
    props: HandleUpdateCurrentSongDBProps,
  ) => Promise<void>;
  handleSkipPrevious: () => void;
  handleSkipNext: () => void;
}

interface controlProgressTrackProps {
  handleSkipNext: () => void;
}

export interface HandleUpdateCurrentSongDBProps {
  idRoom: number;
  isClosed: boolean;
  currentSong: number;
}

function useListenSongs({
  asyncReloadRoomData,
  song,
  songs,
  indexCurrentSong,
  onUpdateRoom,
  roomData,
}: useListenSongsProps): useListenSongsResult {
  const [progressTrack, setProgressTrack] = useState(0);
  //   const [defaultIsPlaying, setDefaultIsPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio());
  const intervalRef = useRef<NodeJS.Timer>();

  const { duration } = audioRef.current;

  const controlProgressTrack = ({
    handleSkipNext,
  }: controlProgressTrackProps) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleSkipNext();
        setProgressTrack(0);
      } else {
        setProgressTrack(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handleChangeScrub = (_event: Event, value: number | number[]) => {
    if (intervalRef.current && typeof value === "number") {
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setProgressTrack(audioRef.current.currentTime);
    }
  };

  const handleChangeScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    controlProgressTrack({ handleSkipNext });
  };

  const handleUpdateCurrentSongDB = async ({
    idRoom,
    isClosed,
    currentSong,
  }: HandleUpdateCurrentSongDBProps) => {
    return updateRoom({
      id_room: idRoom,
      is_closed: isClosed,
      current_song: currentSong,
    })
      .then(async () => {
        await asyncReloadRoomData();
        setIsPlaying(true);
      })
      .catch((err) => {
        if (err instanceof Error) {
          onUpdateRoom(err.message);
          console.error(err);
        }
      });
  };

  const handleSkipPrevious = () => {
    if (songs[indexCurrentSong - 1]) {
      handleUpdateCurrentSongDB({
        idRoom: roomData.id_room,
        isClosed: true,
        currentSong: songs[indexCurrentSong - 1].id_song,
      });
    }
  };

  const handleSkipNext = useCallback(() => {
    if (songs[indexCurrentSong + 1]) {
      handleUpdateCurrentSongDB({
        idRoom: roomData.id_room,
        isClosed: true,
        currentSong: songs[indexCurrentSong + 1].id_song,
      });
    }
  }, [indexCurrentSong, songs, roomData]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (song && audioRef.current.src !== song.audio) {
      audioRef.current.pause();
      audioRef.current = new Audio(song.audio);
    }
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      controlProgressTrack({ handleSkipNext });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, handleSkipNext]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    progressTrack,
    duration,
    isPlaying,
    setIsPlaying,
    handleChangeScrub,
    handleChangeScrubEnd,
    handleUpdateCurrentSongDB,
    handleSkipPrevious,
    handleSkipNext,
  };
}

export { useListenSongs };
