async function fetchYoutubeData(url: string) {
  const ENDPOINT = process.env.FASTAPI_ENDPOINT as string;
  const encodeURL = encodeURIComponent(url);

  const result = await fetch(ENDPOINT + encodeURL);
  const youtubeOptions = await result.json();

  const name_song = youtubeOptions.title;
  const img = youtubeOptions.thumbnails[0].url;
  const findAudio = youtubeOptions.formats.find(
    (format: any) => format.format_id === "249",
  );
  const audio = findAudio?.url || "";

  return { name_song, img, audio };
}

export { fetchYoutubeData };
