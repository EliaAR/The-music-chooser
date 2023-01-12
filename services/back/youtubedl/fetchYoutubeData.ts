import youtubedl from "youtube-dl-exec";

async function fetchYoutubeData(url: string) {
  const youtubeOptions = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
  });

  const name_song = youtubeOptions.title;
  const img = youtubeOptions.thumbnails[0].url;
  const audio = youtubeOptions.formats[0].url;

  return { name_song, img, audio };
}

export { fetchYoutubeData };
