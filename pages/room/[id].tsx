import { useRouter } from "next/router";

function IdRoom() {
  const router = useRouter();
  const { id } = router.query;
  return <p>{id}</p>;
}

export default IdRoom;
