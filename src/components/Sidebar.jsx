import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const LinkRoute = styled(NavLink)(({ theme }) => ({
  fontSize: "1rem",
  textDecoration: "none",
  transition: "all 0.2s",
  padding: "1rem 2rem",
  "&:hover": {
    backgroundColor: "#E85A4F",
  },
}));

const SideDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "6rem",
}));

const Sidebar = () => {
  return (
    <SideDiv>
      <LinkRoute
        to="register"
        style={({ isActive }) => {
          return { color: isActive ? "#E85A4F" : "#747474" };
        }}
      >
        Create Course
      </LinkRoute>
      <LinkRoute
        to="register"
        style={({ isActive }) => {
          return { color: isActive ? "#E85A4F" : "#747474" };
        }}
      >
        Update Course
      </LinkRoute>
      <LinkRoute
        to="register"
        style={({ isActive }) => {
          return { color: isActive ? "#E85A4F" : "#747474" };
        }}
      ></LinkRoute>
      <LinkRoute
        to="register"
        style={({ isActive }) => {
          return { color: isActive ? "#E85A4F" : "#747474" };
        }}
      ></LinkRoute>
    </SideDiv>
  );
};

export default Sidebar;
