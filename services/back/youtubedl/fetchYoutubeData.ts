import youtubedl from "youtube-dl-exec";

async function fetchYoutubeData(url: string) {
  const youtubeOptions = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    noCheckCertificates: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
  });

  const name_song = youtubeOptions.title;
  const img = youtubeOptions.thumbnails[0].url;
  const findAudio = youtubeOptions.formats.find(
    (format) => format.format_id === "249",
  );
  const audio = findAudio?.url || "";

  return { name_song, img, audio };
}

export { fetchYoutubeData };
