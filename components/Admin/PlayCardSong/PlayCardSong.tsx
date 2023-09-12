import Image from "next/image";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import { SongModel } from "../../../types/song";
import { ButtonsSong } from "../ButtonsSong/ButtonsSong";
import styles from "./PlayCardSong.module.scss";

interface PlayCardSongProps {
  song: SongModel;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onSkipPrevious: () => void;
  onSkipNext: () => void;
  onChangeScrub: (event: Event, value: number | number[]) => void;
  onChangeScrubEnd: () => void;
  progressTrack: number;
  maxSliderSong: number;
}

function PlayCardSong({
  song,
  isPlaying,
  onPlayPauseClick,
  onSkipPrevious,
  onSkipNext,
  onChangeScrub,
  onChangeScrubEnd,
  progressTrack,
  maxSliderSong,
}: PlayCardSongProps) {
  return (
    <Card
      component="section"
      sx={{ boxShadow: 3 }}
      className={styles.playCardSong}
    >
      <Box component="article" className={styles.playCardSong__imageContainer}>
        <Image
          src={song.img}
          alt={song.name_song}
          title={song.name_song}
          priority={true}
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <Box component="article" className={styles.playCardSong__songContainer}>
        <Typography
          component="h6"
          variant="subtitle2"
          title={song.name_song}
          className={styles.playCardSong__songTitle}
        >
          {song.name_song}
        </Typography>

        <Divider className={styles.playCardSong__songDivider} />

        <ButtonsSong
          isPlaying={isPlaying}
          onPlayPauseClick={onPlayPauseClick}
          onSkipPrevious={onSkipPrevious}
          onSkipNext={onSkipNext}
        />

        <Divider className={styles.playCardSong__songDivider} />

        <Slider
          onChange={onChangeScrub}
          onChangeCommitted={onChangeScrubEnd}
          value={progressTrack}
          min={0}
          max={maxSliderSong}
          step={1}
          aria-label="indicador de por dónde va la canción"
          className={styles.playCardSong__songSlider}
        />
      </Box>
    </Card>
  );
}

export { PlayCardSong };
