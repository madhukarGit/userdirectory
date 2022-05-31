import { Box, Card, Modal, styled, Typography } from "@mui/material";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
}));

const CardDiv = styled(Card)(({ theme }) => ({
  height: "40vh",
  width: "60vw",
  backgroundColor: "#2E151B",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4rem",
}));

const ModalDiv = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const style = {
  color: "#F172A1",
  padding: "0 2rem",
  fontSize: "1.4rem",
  fontWeight: "500",
};

const SuccessCard = ({ data, open, close }) => {
  const handleClose = () => {
    close(false);
  };
  return (
    <Container>
      <ModalDiv
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CardDiv>
          <Typography variant="h6" sx={style}>
            {data}
          </Typography>
        </CardDiv>
      </ModalDiv>
    </Container>
  );
};

export default SuccessCard;
