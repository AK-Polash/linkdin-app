import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";

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

  // let handleLogOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       dispatch(activeUser(null));
  //       localStorage.removeItem("userInfo");

  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 500);
  //     })
  //     .catch((error) => {
  //       console.log(error.code);
  //     });
  // };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "red" }}>Home Page</h1>

      {/* <button onClick={handleLogOut}>Log Out</button> */}
    </div>
  );
};

export default Home;
