import { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { SongModel } from "../../types/song";
import { ButtonsSong } from "../ButtonsSong/ButtonsSong";
import styles from "./PlayCardSong.module.scss";

interface PlayCardSongProps {
  song: SongModel;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  defaultIsPlaying?: boolean;
}
interface controlProgressTrackProps {
  onSkipNext: () => void;
}

function PlayCardSong({
  song,
  onSkipNext,
  onSkipPrevious,
  defaultIsPlaying,
}: PlayCardSongProps) {
  const [progressTrack, setProgressTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying || false);

  const audioRef = useRef(new Audio(song.audio));
  const intervalRef = useRef<NodeJS.Timer>();

  const { duration } = audioRef.current;

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    audioRef.current.pause();
    audioRef.current = new Audio(song.audio);
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      controlProgressTrack({ onSkipNext });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, onSkipNext]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const controlProgressTrack = ({ onSkipNext }: controlProgressTrackProps) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onSkipNext();
        setProgressTrack(0);
      } else {
        setProgressTrack(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setProgressTrack(audioRef.current.currentTime);
    }
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    controlProgressTrack({ onSkipNext });
  };

  return (
    <Card
      component="section"
      sx={{ boxShadow: 3 }}
      className={styles.playCardSong}
    >
      <CardMedia
        component="img"
        image={song.img}
        alt={song.name_song}
        sx={{ height: 120, width: "auto", objectFit: "fill" }}
        className={styles.playCardSong__img}
      />
      <Box component="article" className={styles.playCardSong__songContainer}>
        <Typography
          component="h6"
          variant="h6"
          sx={{ fontSize: 15 }}
          className={styles.playCardSong__songTitle}
          title={song.name_song}
        >
          {song.name_song}
        </Typography>
        <Divider sx={{ width: 230 }} />
        <ButtonsSong
          isPlaying={isPlaying}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          onSkipPrevious={onSkipPrevious}
          onSkipNext={onSkipNext}
        />
        <Divider sx={{ width: 230 }} />
        <Slider
          aria-label="time-indicator"
          value={progressTrack}
          min={0}
          step={1}
          max={duration ? duration : 0}
          onChange={(_, value) => onScrub(value as number)}
          onChangeCommitted={() => onScrubEnd()}
          sx={{ width: 200, height: 10 }}
        />
      </Box>
    </Card>
  );
}

export { PlayCardSong };
