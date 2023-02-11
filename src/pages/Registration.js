import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  styled,
} from "@mui/material/";
import Image from "../components/Image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const theme = createTheme();

const Registration = () => {
  let auth = getAuth();
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  let [errorMsg, setErrorMsg] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userNameRegex =
      /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/g;
    let upperCase = /[A-Z]/;
    let lowerCase = /[a-z]/;
    let number = /[0-9]/;

    if (data.get("email") === "") {
      setErrorMsg({ ...errorMsg, email: "Email Required" });
    } else if (!emailRegex.test(data.get("email"))) {
      setErrorMsg({ ...errorMsg, email: "Valid Email Required" });
    } else if (data.get("fullName") === "") {
      setErrorMsg({ ...errorMsg, fullName: "Full Name Required" });
    } else if (!userNameRegex.test(data.get("fullName"))) {
      setErrorMsg({ ...errorMsg, fullName: "Enter Valid Name" });
    } else if (data.get("password") === "") {
      setErrorMsg({ ...errorMsg, password: "Enter password" });
    } else if (data.get("password") === "") {
      setErrorMsg({ ...errorMsg, password: "Enter password" });
    } else if (!upperCase.test(data.get("password"))) {
      setErrorMsg({ ...errorMsg, password: "One Upper Case Letter Required" });
    } else if (!lowerCase.test(data.get("password"))) {
      setErrorMsg({ ...errorMsg, password: "One Lower Case Letter Required" });
    } else if (!number.test(data.get("password"))) {
      setErrorMsg({ ...errorMsg, password: "One Number Required" });
    } else if (data.get("password").length < 8) {
      setErrorMsg({ ...errorMsg, password: "Minimum 8 Char Required" });
    } else {
      setErrorMsg({ ...errorMsg, email: "", fullName: "", password: "" });

      createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      )
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: data.get("fullName"),
          })
            .then(() => {
              setFormData({
                ...formData,
                email: "",
                fullName: "",
                password: "",
              });

              navigate("/login");
            })
            .catch((error) => {
              console.log(error.code);
            });

          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrorMsg({ ...errorMsg, email: "Email already in use" });
          }
        });

      // setFormData({
      //   ...formData,
      //   email: data.get("email"),
      //   fullName: data.get("fullName"),
      //   password: data.get("password"),
      // });
      console.log("kaj hoise");
    }
  };

  let [show, setShow] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "95vh",
          }}
        >
          <div className="logo__holder">
            {/* <svg
              className="signup__logo"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.5262 2.5262C0 5.05241 0 9.11827 0 17.25V28.75C0 36.8817 0 40.9476 2.5262 43.4738C5.05241 46 9.11827 46 17.25 46H28.75C36.8817 46 40.9476 46 43.4738 43.4738C46 40.9476 46 36.8817 46 28.75V17.25C46 9.11827 46 5.05241 43.4738 2.5262C40.9476 0 36.8817 0 28.75 0H17.25C9.11827 0 5.05241 0 2.5262 2.5262ZM11.4811 14.4099C9.58715 14.4099 8.05 12.8571 8.05 10.9425C8.05 9.02789 9.58715 7.475 11.4811 7.475C13.3751 7.475 14.9123 9.02789 14.9123 10.9425C14.9123 12.8571 13.3771 14.4099 11.4811 14.4099ZM8.54016 38.525V16.9024H14.4221V38.525H8.54016ZM32.068 38.525H37.95V25.2389C37.95 14.9132 26.9644 15.2886 24.2254 20.3719V16.9024H18.3434V38.525H24.2254V27.5093C24.2254 21.3901 32.068 20.8889 32.068 27.5093V38.525Z"
                fill="url(#paint0_linear_3017_641)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3017_641"
                  x1="23"
                  y1="0"
                  x2="23"
                  y2="46"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0077B5" />
                  <stop offset="1" stop-color="#0E6795" />
                </linearGradient>
              </defs>
            </svg> */}
            <Image
              className="signup__logo"
              imageSource="./assets/Logo.png"
              alt="Logo Img"
            />
          </div>
          <Typography component="h1" variant="h5" color="#11175D">
            Get started with easily register
          </Typography>
          <Typography component="p" variant="subtitle1" color="#888BAE">
            Free register and you can enjoy it
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} rowGap={3}>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus={errorMsg.email ? true : false}
                  onChange={(e) => {
                    setErrorMsg({ ...errorMsg, email: "" });
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  value={formData.email}
                />

                {errorMsg.email && (
                  <Alert
                    sx={{
                      padding: "0 15px",
                      width: "calc(100% - 16px)",
                      position: "absolute",
                      bottom: "-37.8px",
                      left: "16px",
                      fontSize: "14px",
                    }}
                    variant="filled"
                    severity="error"
                  >
                    {errorMsg.email}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  autoComplete="family-name"
                  autoFocus={errorMsg.fullName ? true : false}
                  onChange={(e) => {
                    setErrorMsg({ ...errorMsg, fullName: "" });
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                  value={formData.fullName}
                />
                {errorMsg.fullName && (
                  <Alert
                    sx={{
                      padding: "0 15px",
                      width: "calc(100% - 16px)",
                      position: "absolute",
                      bottom: "-37.8px",
                      left: "16px",
                    }}
                    variant="filled"
                    severity="error"
                  >
                    {errorMsg.fullName}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={show ? "text" : "password"}
                  autoComplete="new-password"
                  autoFocus={errorMsg.password ? true : false}
                  onChange={(e) => {
                    setErrorMsg({ ...errorMsg, password: "" });
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  value={formData.password}
                />

                {show ? (
                  <BsFillEyeFill
                    onClick={() => setShow(!show)}
                    className="eyeIcon"
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setShow(!show)}
                    className="eyeIcon"
                  />
                )}

                {errorMsg.password && (
                  <Alert
                    sx={{
                      padding: "0 15px",
                      width: "calc(100% - 16px)",
                      position: "absolute",
                      bottom: "-37.8px",
                      left: "16px",
                    }}
                    variant="filled"
                    severity="error"
                  >
                    {errorMsg.password}
                  </Alert>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, padding: "11px 0", borderRadius: "40px" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registration;
