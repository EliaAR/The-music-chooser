import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getRoom, getSongs, createSong } from "../../services/index";
import { GetLocalStorage } from "../../services/localStorage";
import { RoomModel, SongModel } from "../../types/model";
import { Header } from "../../components/Header/Header";
import { Room } from "../../components/Room/Room";
import { Admin } from "../../components/Admin/Admin";
import { Alert } from "../../components/Common/Alert/Alert";

function RoomById() {
  const [data, setData] = useState<RoomModel | undefined>();
  const [fetchRoom, setFetchRoom] = useState(true);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [urlSong, setUrlSong] = useState("");
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [idVotadas, setIdVotadas] = useState([] as number[]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { id } = router.query;

  const indexCurrentSong = songs.findIndex(
    (song) => song.id_song === data?.current_song,
  );

  const currentSong = songs[indexCurrentSong];

  useEffect(() => {
    if (fetchRoom) {
      if (id && typeof id === "string")
        getRoom({ id }).then((data) => {
          setData(data);
          setFetchRoom(false);
        });
    }
  }, [fetchRoom, id]);

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
    console.log("effect one");
    console.log(localStorageIsAdmins, "localStorage");
    if (data && localStorageIsAdmins.includes(data.id_room)) {
      console.log("effect two");
      setIsAdmin(true);
    }
  }, [data]);

  useEffect(() => {
    if (callAPIGet && data) {
      setCallAPIGet(false);
      getSongs({ id: data.id_room })
        .then((data) => setSongs(data))
        .catch((err) => console.log(err));
    }
  }, [callAPIGet, id, data]);

  useEffect(() => {
    if (callAPIPost && data) {
      setError("");
      setCallAPIPost(false);
      createSong({ idRoom: data.id_room, urlSong })
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
  }, [callAPIPost, id, urlSong, data]);

  return (
    <>
      {data ? (
        <>
          <Header
            title={
              isAdmin
                ? `SALA ADMIN ${data.name_room}`
                : `SALA ${data.name_room}`
            }
          />
          {isAdmin ? (
            <Admin
              valueAddSongInput={urlSong}
              onChangeAddSongInput={(e) => setUrlSong(e.target.value)}
              onClickCallAPIPost={() => setCallAPIPost(true)}
              currentSong={currentSong}
              songs={songs}
              isClosed={data.is_closed}
              idVotadas={idVotadas}
              handleIdVotadas={(newIdArrayVotadas) =>
                setIdVotadas(newIdArrayVotadas)
              }
              onVoteSuccess={() => setCallAPIGet(true)}
              onVoteError={(err) => setError(err)}
              indexCurrentSong={indexCurrentSong}
              roomData={data}
              reloadRoomData={() => setFetchRoom(true)}
              onUpdateRoom={(err) => setError(err)}
            />
          ) : (
            <Room
              valueAddSongInput={urlSong}
              onChangeAddSongInput={(e) => setUrlSong(e.target.value)}
              onClickCallAPIPost={() => setCallAPIPost(true)}
              songs={songs}
              isClosed={data.is_closed}
              idVotadas={idVotadas}
              handleIdVotadas={(newIdArrayVotadas) =>
                setIdVotadas(newIdArrayVotadas)
              }
              onVoteSuccess={() => setCallAPIGet(true)}
              onVoteError={(err) => setError(err)}
              indexCurrentSong={indexCurrentSong}
              isAdmin={isAdmin}
            />
          )}

          <Alert
            open={error !== ""}
            alertMsg={error}
            handleCloseAlert={() => setError("")}
          />
        </>
      ) : null}
    </>
  );
}

export default RoomById;
