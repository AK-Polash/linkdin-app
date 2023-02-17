import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material/";
import Image from "./Image";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";

const settings = ["Profile", "Logout"];

function RootLayout() {
  let auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(activeUser(null));
        localStorage.removeItem("userInfo");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const handleCloseUserMenu = (item) => {
    setAnchorElUser(null);

    if (item === "Logout") {
      handleLogOut();
    } else if (item === "Profile") {
      navigate("/profile");
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{ width: { xs: "30px", md: "40px" }, mr: 1 }}
            >
              <Link to="/">
                <Image
                  className="signup__logo"
                  imageSource="./assets/Logo.png"
                  alt="Logo"
                />
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 0,
                columnGap: "10px",
              }}
            >
              <Tooltip title="settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Box>
                    {data.userData.userInfo &&
                    data.userData.userInfo.photoURL ? (
                      <Image
                        imageSource={data.userData.userInfo.photoURL}
                        alt="profile image"
                      />
                    ) : (
                      data.userData.userInfo &&
                      !data.userData.userInfo.photoURL && (
                        <Avatar
                          alt={data.userData.userInfo.displayName}
                          src="/static/images/avatar/2.jpg"
                        />
                      )
                    )}
                  </Box>
                </IconButton>
              </Tooltip>

              <Typography
                component="p"
                sx={{ display: { xs: "none", md: "block" }, color: "#333" }}
              >
                {data.userData.userInfo
                  ? data.userData.userInfo.displayName
                  : ""}
              </Typography>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center"> {setting} </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ============================= Outlet Start =================================== */}

      <Outlet />

      {/* ============================= Outlet End =================================== */}
    </>
  );
}
export default RootLayout;
