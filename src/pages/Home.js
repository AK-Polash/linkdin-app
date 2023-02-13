import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { Box, Container } from "@mui/material";
import PostComponent from "../components/PostComponent";

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
        marginTop: "30px",
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
              width: "75%",
              padding: "30px 25px",
              background: "#FFF",
              borderRadius: "8px",
            }}
          >
            <PostComponent />
          </Box>
          <Box sx={{ width: "25%", borderRadius: "8px" }}>
            <div style={{ width: "100%", background: "orange" }}>
              right side
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
