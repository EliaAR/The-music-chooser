import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import styles from "./ButtonsSong.module.scss";

interface ButtonsSongProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onSkipPrevious: () => void;
  onSkipNext: () => void;
}

function ButtonsSong({
  isPlaying,
  onPlayPauseClick,
  onSkipPrevious,
  onSkipNext,
}: ButtonsSongProps) {
  return (
    <Box component="article" className={styles.buttonsSong}>
      <IconButton onClick={onSkipPrevious} aria-label="previous">
        <SkipPreviousRoundedIcon />
      </IconButton>

      <IconButton onClick={onPlayPauseClick} aria-label="play/pause">
        {isPlaying ? (
          <PauseRoundedIcon className={styles.buttonsSong__pause} />
        ) : (
          <PlayArrowRoundedIcon className={styles.buttonsSong__play} />
        )}
      </IconButton>

      <IconButton onClick={onSkipNext} aria-label="next">
        <SkipNextRoundedIcon />
      </IconButton>
    </Box>
  );
}

export { ButtonsSong };
