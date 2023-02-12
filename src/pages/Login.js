import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "../components/Image";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  let auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [loader, setLoader] = useState(false);

  // Modal:
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setFormData({ ...formData, forgotPassword: "" });
    setErrorMsg({ ...errorMsg, forgotPassword: "" });
  };
  const handleClose = () => setOpen(false);

  let [formData, setFormData] = useState({
    email: "",
    password: "",
    forgotPassword: "",
  });

  let [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
    forgotPassword: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (data.get("email") === "") {
      setErrorMsg({ ...errorMsg, email: "Email Required" });
    } else if (!emailRegex.test(data.get("email"))) {
      setErrorMsg({ ...errorMsg, email: "Valid Email Required" });
    } else if (data.get("password") === "") {
      setErrorMsg({ ...errorMsg, password: "Enter password" });
    } else {
      setErrorMsg({ ...errorMsg, email: "", password: "" });
      setLoader(true);

      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          dispatch(activeUser(userCredential.user));

          setFormData({
            ...formData,
            email: "",
            password: "",
          });

          toast.success("🦄 Login Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setTimeout(() => {
            setLoader(false);
            navigate("/profile");
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/user-not-found")) {
            setErrorMsg({ ...errorMsg, email: "User not found" });
            setLoader(false);
          } else if (errorCode.includes("auth/wrong-password")) {
            setErrorMsg({ ...errorMsg, password: "Wrong password" });
            setLoader(false);
          } else if (errorCode.includes("auth/network-request-failed")) {
            setErrorMsg({ ...errorMsg, password: "Network Error" });
            setLoader(false);
          }
        });
    }
  };

  let handleForgotPassword = () => {
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!formData.forgotPassword) {
      setErrorMsg({
        ...errorMsg,
        forgotPassword: "Email Address Required",
      });
    } else if (!emailRegex.test(formData.forgotPassword)) {
      setErrorMsg({
        ...errorMsg,
        forgotPassword: "Enter a valid Email Address",
      });
    } else {
      sendPasswordResetEmail(auth, formData.forgotPassword)
        .then(() => {
          setOpen(false);
        })
        .catch((error) => {
          if (error.code.includes("auth/missing-email")) {
            setErrorMsg({
              ...errorMsg,
              forgotPassword: "Missing Email",
            });
          }
          if (error.code.includes("auth/user-not-found")) {
            setErrorMsg({
              ...errorMsg,
              forgotPassword: "User Not Found",
            });
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
            <Image
              className="signup__logo"
              imageSource="./assets/Logo.png"
              alt="Logo Img"
            />
          </div>
          <Typography component="h1" variant="h5" color="#11175D">
            Login
          </Typography>
          <Typography component="p" variant="subtitle1" color="#888BAE">
            Login to your account
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleLogin}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} rowGap={3}>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  disabled={loader ? true : false}
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
                  // error={errorMsg.password ? true : false}
                  // helperText={errorMsg.password ? errorMsg.password : ""}
                  required
                  fullWidth
                  disabled={loader ? true : false}
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

            {loader ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{
                  display: "block",
                  margin: "0 auto ",
                  marginTop: "40px",
                  marginBottom: "16px",
                  width: "46.49px",
                  height: "46.49px",
                }}
                wrapperClass="blocks-wrapper"
                colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
              />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2, padding: "11px 0", borderRadius: "40px" }}
              >
                Sign In
              </Button>
            )}

            <Grid container sx={{ visibility: loader ? "hidden" : "visible" }}>
              <Grid item xs>
                <span onClick={handleOpen} className="auth__link">
                  Forgot password?
                </span>
              </Grid>
              <Grid item>
                <Link to="/signup" className="auth__link">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

            {/* ============================== Modal start =============================== */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 200,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h3"
                    sx={{ marginBottom: "10px", fontSize: "24px" }}
                  >
                    Forgot Password
                  </Typography>

                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="standard"
                    type="email"
                    size="small"
                    name="forgotPassword"
                    autoFocus={true}
                    helperText={
                      errorMsg.forgotPassword ? errorMsg.forgotPassword : ""
                    }
                    error={errorMsg.forgotPassword ? true : false}
                    onChange={(e) => {
                      setErrorMsg({ ...errorMsg, forgotPassword: "" });
                      setFormData({
                        ...formData,
                        forgotPassword: e.target.value,
                      });
                    }}
                    value={formData.forgotPassword}
                  />

                  <Button
                    fullWidth
                    onClick={handleForgotPassword}
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 2,
                      padding: "8px 0",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    Forgot Password
                  </Button>
                </Box>
              </Fade>
            </Modal>
            {/* ============================== Modal end =============================== */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
