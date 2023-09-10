import { getServerRoom } from "../../services/back/getServerSideProps/getServerRoom";
import { errorMessage } from "../../utils/errorMessages";
import { useRoomData } from "../../hooks/useRoomData";
import { RoomModel } from "../../types/room";
import { LoaderComponent } from "../../components/Common/LoaderComponent/LoaderComponent";
import { Header } from "../../components/Common/Header/Header";
import { Room } from "../../components/Room/Room";
import { Admin } from "../../components/Admin/Admin";
import { Alert } from "../../components/Common/Alert/Alert";

export const getServerSideProps = getServerRoom;

interface RoomByIdProps {
  roomDataPN: RoomModel;
}

function RoomById({ roomDataPN }: RoomByIdProps) {
  const {
    room,
    isLoading,
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
  } = useRoomData({ roomServer: roomDataPN });

  return (
    <>
      <Header />

      {isLoading ? (
        <LoaderComponent />
      ) : isAdmin ? (
        <Admin
          title={roomDataPN.name_room}
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
          title={roomDataPN.name_room}
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
        alertMsg={errorMessage(error)}
        handleCloseAlert={() => setError("")}
      />
    </>
  );
}

export default RoomById;
