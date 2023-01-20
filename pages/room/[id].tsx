import { useRouter } from "next/router";
import { useRoomData } from "../../hooks/useRoomData";
import { Header } from "../../components/Common/Header/Header";
import { Room } from "../../components/Room/Room";
import { Admin } from "../../components/Admin/Admin";
import { Alert } from "../../components/Common/Alert/Alert";

function RoomById() {
  const router = useRouter();

  const { id } = router.query;

  const {
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
  } = useRoomData({ id });

  return (
    <>
      {room ? (
        <>
          <Header />

          {isAdmin ? (
            <Admin
              title={room.name_room}
              valueAddSongInput={urlSong}
              onChangeAddSongInput={(e) => setUrlSong(e.target.value)}
              onClickCallAPIPost={() => setCallAPIPost(true)}
              currentSong={currentSong}
              songs={songs}
              isClosed={room.is_closed}
              idVotadas={idVotadas}
              handleIdVotadas={(newIdArrayVotadas) =>
                setIdVotadas(newIdArrayVotadas)
              }
              onVoteSuccess={() => setCallAPIGet(true)}
              onVoteError={(err) => setError(err)}
              indexCurrentSong={indexCurrentSong}
              roomData={room}
              reloadRoomData={() => setFetchRoom(true)}
              onUpdateRoom={(err) => setError(err)}
              isAdmin={isAdmin}
            />
          ) : (
            <Room
              title={room.name_room}
              valueAddSongInput={urlSong}
              onChangeAddSongInput={(e) => setUrlSong(e.target.value)}
              onClickCallAPIPost={() => setCallAPIPost(true)}
              songs={songs}
              isClosed={room.is_closed}
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
