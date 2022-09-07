import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
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
      <IconButton aria-label="previous" onClick={onSkipPrevious}>
        <SkipPreviousRoundedIcon />
      </IconButton>
      <IconButton aria-label="play/pause" onClick={onPlayPauseClick}>
        {isPlaying ? (
          <PauseRoundedIcon sx={{ height: 38, width: 38 }} />
        ) : (
          <PlayArrowRoundedIcon sx={{ height: 38, width: 38 }} />
        )}
      </IconButton>
      <IconButton aria-label="next" onClick={onSkipNext}>
        <SkipNextRoundedIcon />
      </IconButton>
    </Box>
  );
}

export { ButtonsSong };
