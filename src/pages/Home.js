import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onValue, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { Box, Container, Alert } from "@mui/material";
import PostField from "../components/PostField";
import SmallProfile from "../components/SmallProfile";
import PostItem from "../components/PostItem";

const Home = () => {
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();
  let data = useSelector((state) => state);
  let navigate = useNavigate();
  let [postItem, setPostItem] = useState([]);

  useEffect(() => {
    if (!data.userData.userInfo) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let postRef = ref(db, "posts");
    onValue(postRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {
        if (
          data.userData.userInfo &&
          data.userData.userInfo.uid !== item.val().posterId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setPostItem(arr);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F9FB",
        paddingTop: "30px",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            columnGap: "40px",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "75%",
              },
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              rowGap: "30px",
            }}
          >
            <PostField />

            {postItem.length > 0 ? (
              postItem.map((item) => (
                <PostItem
                  key={item.id}
                  posterName={item.posterName}
                  posterImage={item.posterImage}
                  postDate="Today 8pm"
                  post={item.postText}
                  postImage="./assets/post__img.png"
                />
              ))
            ) : (
              <Alert variant="filled" severity="info">
                No Post..!
              </Alert>
            )}
          </Box>

          <Box
            sx={{
              width: { xs: "0", md: "25%" },
              borderRadius: "5px",
              background: "#fff",
              overflow: "hidden",
              alignSelf: "flex-start",
              display: { xs: "none", md: "block" },
            }}
          >
            <SmallProfile />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
