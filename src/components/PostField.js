import { Box, Divider, Typography, TextareaAutosize } from "@mui/material";
import React from "react";
import { FiSend } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";

const PostField = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        padding: "25px 30px",
        borderRadius: "5px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
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
          marginTop: { xs: "0", md: "15px" },
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
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
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

export default PostField;
