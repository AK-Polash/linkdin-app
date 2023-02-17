import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  ButtonGroup,
} from "@mui/material";
import { IoIosSend } from "react-icons/io";
import Image from "../components/Image";
import { Container } from "@mui/system";

const Profile = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F9FB",
        paddingTop: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Card sx={{ maxWidth: "75%" }}>
          <CardMedia
            sx={{ height: 180 }}
            image="./assets/cover.png"
            title="cover photo"
          />

          <Box
            sx={{
              display: "flex",
              columnGap: "25px",
            }}
          >
            <Box sx={{ width: "170px", height: "170px", borderRadius: "50%" }}>
              <Image
                className="poster__image"
                imageSource="./assets/profile.png"
              />
            </Box>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontSize="18px"
                  fontWeight="700"
                >
                  AK Polash
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "8px",
                  }}
                >
                  <IoIosSend />
                  <Typography variant="h5" component="div" fontSize="12px">
                    Saint Petersburg, Russian Federation
                  </Typography>
                </Box>
              </Box>

              <Typography gutterBottom variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: "14px",
                  width: "170px",
                  height: "32px",
                  background: "#076FA5",
                  fontSize: "12px",
                }}
              >
                Contact Info
              </Button>
            </CardContent>
          </Box>

          {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}

          <ButtonGroup
            variant={true ? "contained" : "outlined"}
            aria-label="outlined primary button group"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "30px 0",
            }}
          >
            <Button>PROFILE</Button>
            <Button>FRIENDS</Button>
            <Button>POST</Button>
          </ButtonGroup>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
