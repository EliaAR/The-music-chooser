import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getRoom } from "../../services/index";
import { RoomModel } from "../../types/model";
import { Header } from "../../components/Header/Header";

function PartyRoom() {
  const [data, setData] = useState<RoomModel | undefined>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === "string")
      getRoom({ id }).then((data) => setData(data));
  }, [id]);

  return (
    <>
      {data ? (
        <>
          <Header title={`Sala Reproducción ${data.name_room}`} />
          <p>Sala reproducción</p>
        </>
      ) : null}
    </>
  );
}

export default PartyRoom;
