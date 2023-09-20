import { YoutubedlModel } from "../../../types/youtubedl";

async function fetchYoutubeData(url: string): Promise<YoutubedlModel> {
  const ENDPOINT = process.env.FASTAPI_ENDPOINT as string;
  const encodeURL = encodeURIComponent(url);

  const result = await fetch(ENDPOINT + encodeURL);
  const youtubeOptions = await result.json();

  const name_song = youtubeOptions.title;

  const findImg = youtubeOptions.thumbnails.find((thumbnail: any) =>
    thumbnail.url.endsWith("/mqdefault.webp"),
  );
  const img = findImg?.url || "";
  // const img = youtubeOptions.thumbnails[0].url;

  const findAudio = youtubeOptions.formats.find(
    (format: any) => format.format_id === "249",
  );
  const audio: string = findAudio?.url || "";

  const audioSplit = audio.split("?");
  const audioFirstExtraction = audioSplit[1];
  const params = new URLSearchParams(audioFirstExtraction);
  const expireParam = params.get("expire");
  const expire = expireParam ? Number.parseInt(expireParam) : 0;

  return { name_song, img, audio, expire };
}

export { fetchYoutubeData };
