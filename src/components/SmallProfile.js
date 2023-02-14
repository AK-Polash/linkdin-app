import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "./Image";

const SmallProfile = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="cover__image__holder">
        <Image
          className="cover__img  profile__img"
          imageSource="./assets/cover.png"
          alt="cover"
        />
      </div>
      <div className="profile__image__holder">
        <Image
          className="profile__img"
          imageSource="./assets/profile.png"
          alt="profile"
        />
      </div>
      <div className="profile__texts">
        <Typography
          component="h3"
          color="#181818"
          fontSize="18px"
          fontWeight="bold"
          textAlign="center"
          marginTop="35px"
        >
          AK Polash
        </Typography>

        <Typography
          component="p"
          fontFamily="'Barlow', sans-serif"
          color="#181818"
          fontSize="14px"
          fontWeight="normal"
          textAlign="center"
        >
          Freelance UX/UI designer, 80+ projects in web design, mobile apps (iOS
          & android) and creative projects. Open to offers.
        </Typography>
      </div>
    </Box>
  );
};

export default SmallProfile;
