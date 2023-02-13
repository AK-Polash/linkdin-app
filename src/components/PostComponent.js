import { Box, Divider, Typography, TextareaAutosize } from "@mui/material";
import React from "react";
import { FiSend } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";

const PostComponent = () => {
  return (
    <div style={{ width: "100%" }}>
      <Typography component="h5" fontSize="14px" marginBottom="15px">
        New Post
      </Typography>

      <Divider />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "20px",
          padding: "10px 0",
          marginTop: "20px",
        }}
      >
        <input
          className="post__input"
          type="text"
          name="post"
          placeholder="What's on your mind?"
        />

        <Box
          sx={{
            width: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: "10px",
          }}
        >
          <div className="post__icon__holder">
            <IoImageOutline className="post__icon" />
          </div>
          <div className="post__icon__holder">
            <FiSend className="post__icon" />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default PostComponent;
