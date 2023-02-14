import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { Box, Container } from "@mui/material";
import PostField from "../components/PostField";
import SmallProfile from "../components/SmallProfile";
import PostItem from "../components/PostItem";

const Home = () => {
  let auth = getAuth();
  let dispatch = useDispatch();
  let data = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    if (!data.userData.userInfo) {
      navigate("/login");
    }
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

            <PostItem
              posterName="Polash Khan"
              posterImage="./assets/profile.png"
              postDate="Today 8pm"
              post="kire khobor ki"
              postImage="./assets/post__img.png"
            />
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
