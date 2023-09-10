import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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

  const audioRef = useRef(new Audio());
  const intervalRef = useRef<NodeJS.Timer>();

  const { duration } = audioRef.current;

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioRef.current.src !== song.audio) {
      audioRef.current.pause();
      audioRef.current = new Audio(song.audio);
    }
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
      <Box component="article" className={styles.playCardSong__imageContainer}>
        <Image
          src={song.img}
          alt={song.name_song}
          title={song.name_song}
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
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          onSkipPrevious={onSkipPrevious}
          onSkipNext={onSkipNext}
        />

        <Divider className={styles.playCardSong__songDivider} />

        <Slider
          onChange={(_, value) => onScrub(value as number)}
          onChangeCommitted={() => onScrubEnd()}
          value={progressTrack}
          min={0}
          step={1}
          max={duration ? duration : 0}
          aria-label="indicador de por dónde va la canción"
          className={styles.playCardSong__songSlider}
        />
      </Box>
    </Card>
  );
}

export { PlayCardSong };