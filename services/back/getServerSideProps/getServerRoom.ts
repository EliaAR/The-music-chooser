import { NextPageContext } from "next";
import { getRoom } from "../room/get";

const getServerRoom = async (context: NextPageContext) => {
  try {
    const roomDataPN = await getRoom({ id_room: context.query.id as string });

    if (roomDataPN && "error" in roomDataPN) throw new Error(roomDataPN.error);
    return {
      props: { roomDataPN },
    };
  } catch (e) {
    console.log(e, "error");
    return {
      notFound: true,
    };
  }
};

export { getServerRoom };
