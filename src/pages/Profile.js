import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  let auth = getAuth();
  let data = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    if (!data.userData.userInfo) {
      navigate("/login");
    }
  }, []);

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

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
      <h1 style={{ color: "red" }}>Profile</h1>

      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Profile;
