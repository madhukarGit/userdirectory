import { Box, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Course from "./courses/Course";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
  display: "flex",
}));

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        anchor={"left"}
      >
        <Sidebar />
      </SwipeableDrawer>
    </React.Fragment>
  );

  return (
    <Container>
      <Box flex={0.2} p={2}>
        <MenuIcon onClick={() => setOpenDrawer(!openDrawer)} />
        {drawer}
      </Box>
      <Box flex={4} p={2}>
        <Course />
      </Box>
    </Container>
  );
};
export default Home;
