import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, styled, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const AvatarDiv = styled(Avatar)(({ theme }) => ({
  height: "25%",
  width: "25%",
}));

const FlexColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const FlexDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TypoDivHi = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 500,
  letterSpacing: "1px",
}));

const TypoDivBody = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 400,
  letterSpacing: "1px",
}));

const LinkDiv = styled(NavLink)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 400,
  letterSpacing: "1px",
  "&:hover": {
    cursor: "pointer",
    color: "#F13C20",
    fontWeight: 700,
    textDecoration: "none",
  },
}));

const CardDiv = ({ title, body, img, id }) => {
  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <FlexColumn>
          <FlexDiv>
            <AvatarDiv src={img} />
            <TypoDivHi gutterBottom>{title}</TypoDivHi>
          </FlexDiv>
          <TypoDivBody>{body}</TypoDivBody>
        </FlexColumn>
      </CardContent>
      <FlexDiv>
        <LinkDiv to={`/lessons/${id}`} size="small">
          {title}
        </LinkDiv>
      </FlexDiv>
    </Card>
  );
};

export default CardDiv;
