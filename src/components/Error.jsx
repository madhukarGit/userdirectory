import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
}));

const Error = () => {
  return <Container>Error</Container>;
};

export default Error;
