import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getRoom } from "../../../services/index";
import { RoomModel } from "../../../types/model";
import { Header } from "../../../components/Header/Header";
import { Room } from "../../../components/Room/Room";

function Vote() {
  const [data, setData] = useState<RoomModel | undefined>();
  const [fetchRoom, setFetchRoom] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (fetchRoom) {
      if (id && typeof id === "string")
        getRoom({ id }).then((data) => {
          setData(data);
          setFetchRoom(false);
        });
    }
  }, [fetchRoom, id]);

  return (
    <>
      {data ? (
        <>
          <Header title={`SALA ${data.name_room}`} />
          <Room roomData={data} reloadRoomData={() => setFetchRoom(true)} />
        </>
      ) : null}
    </>
  );
}

export default Vote;
