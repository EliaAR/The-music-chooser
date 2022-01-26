import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "./CardSong.module.scss";

interface CardSongProps {
  imgSong: string;
  nameSong: string;
}

function CardSong({ imgSong, nameSong }: CardSongProps) {
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.cardSong}>
      <CardContent>
        <Typography
          variant="body1"
          component="p"
          title={nameSong}
          className={styles.cardSong__title}
        >
          {nameSong}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={imgSong}
        alt={nameSong}
        sx={{ maxHeight: 50 }}
      />
      <CardActions>
        <IconButton aria-label="voto" color="secondary">
          <ThumbUpOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export { CardSong };
