import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const PostField = () => {
  let db = getDatabase();
  let data = useSelector((state) => state);
  let [post, setPost] = useState("");

  let handlePost = () => {
    if (!post) {
      console.log("Value den vai");
    } else {
      set(push(ref(db, "posts/")), {
        postText: post,
        posterName: data.userData.userInfo.displayName,
        posterId: data.userData.userInfo.uid,
        // posterPhoto: data.userData.userInfo.photoURL
        //   ? data.userData.userInfo.photoURL
        //   : "",
      })
        .then(() => {
          setPost("");
          console.log("Post kora hoise..!");
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  };

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
          onChange={(e) => setPost(e.target.value)}
          value={post}
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
            <FiSend onClick={handlePost} className="post__icon" />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default PostField;
