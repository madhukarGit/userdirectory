import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext, useState } from "react";
import { Context } from "../context";
import axios from "axios";
import SuccessCard from "../components/SuccessCard";
import logo from "../assets/logo100.svg";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2rem",
}));

const NavIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2px",
}));

const LinkRoute = styled(NavLink)(({ theme }) => ({
  fontSize: "1rem",
  textDecoration: "none",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "1.2rem",
  },
}));

const LogoutDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2px",
  marginLeft: "auto",
}));

const LogoDiv = styled("img")(({ theme }) => ({
  height: "4rem",
  width: "4rem",
  borderRadius: "50%",
}));

const AppBarDiv = styled(AppBar)(({ theme }) => ({
  zIndex: "1302",
}));

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [logoutMessage, setLogoutMessage] = useState();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("http://localhost:8000/api/logout");
    console.log("logout ", data);
    setLogoutMessage(data);
    toast.success("logout successful");
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
    navigate("/login");
  };
  return (
    <AppBarDiv>
      <Toolbar>
        <Container>
          <LogoDiv src={logo} alt="logo" />
          {user === null && (
            <React.Fragment>
              <LinkRoute
                to="/login"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#EAE7DC" : "#FCCD04",
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: isActive
                      ? "1px solid red"
                      : "1px solid white",
                  };
                }}
              >
                login
              </LinkRoute>
              <LinkRoute
                to="register"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#EAE7DC" : "#FCCD04",
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: isActive
                      ? "1px solid red"
                      : "1px solid white",
                  };
                }}
              >
                register
              </LinkRoute>
            </React.Fragment>
          )}

          {user !== null && (
            <React.Fragment>
              <LinkRoute
                to="home"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#EAE7DC" : "#FCCD04",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: isActive
                      ? "1px solid red"
                      : "1px solid white",
                  };
                }}
              >
                <NavIcon>
                  <NoteAddIcon /> <Typography>Create</Typography>
                </NavIcon>
              </LinkRoute>
              <LinkRoute
                to="courses"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#EAE7DC" : "#FCCD04",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: isActive
                      ? "1px solid red"
                      : "1px solid white",
                  };
                }}
              >
                <NavIcon>
                  <AutoStoriesIcon /> <Typography>Courses</Typography>
                </NavIcon>
              </LinkRoute>
              <LinkRoute
                to="lessons"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#EAE7DC" : "#FCCD04",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    borderBottom: isActive
                      ? "1px solid red"
                      : "1px solid white",
                  };
                }}
              >
                <NavIcon>
                  <PlayLessonIcon /> <Typography>Lessons</Typography>
                </NavIcon>
              </LinkRoute>

              <LogoutDiv onClick={logoutHandler}>
                <LogoutIcon />
                <LinkRoute
                  to="/"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#EAE7DC" : "#EFE2BA",
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    };
                  }}
                >
                  Logout
                </LinkRoute>
              </LogoutDiv>
            </React.Fragment>
          )}
          {logoutMessage && (
            <SuccessCard
              data={logoutMessage}
              open={open}
              close={closeHandler}
            />
          )}
        </Container>
      </Toolbar>
    </AppBarDiv>
  );
};

export default NavBar;
