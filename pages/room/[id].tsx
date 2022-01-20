import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Room } from "../../components/Room/Room";
import { getRoom } from "../../services/index";

function IdRoom() {
  const [nameRoom, setNameRoom] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === "string")
      getRoom({ id }).then((data) => setNameRoom(data.name_room));
  }, [id]);

  return (
    <>
      <Header title={`SALA ${nameRoom}`} />
      <Room />
    </>
  );
}

export default IdRoom;
