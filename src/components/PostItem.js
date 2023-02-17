import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material/";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "./Image";

export default function PostItem({
  posterName,
  posterImage,
  postDate,
  postImage,
  post,
}) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          posterImage ? (
            <Box
              sx={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            >
              <Image className="poster__image" imageSource={posterImage} />
            </Box>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {posterName && posterName.charAt(0)}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={posterName}
        subheader={postDate}
      />
      
      <CardContent sx={{ padding: "0 16px 16px" }}>
        <Typography variant="body2" color="text.secondary">
          {post}
        </Typography>
      </CardContent>

      {postImage && (
        <CardMedia
          component="img"
          height={{ xs: 150, md: 300 }}
          image={postImage}
          alt="Paella dish"
        />
      )}

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
