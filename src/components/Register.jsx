import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useContext, useEffect, useState } from "react";
import SuccessCard from "./SuccessCard";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
}));

const FormControlDiv = styled(FormControl)(({ theme }) => ({
  width: "20rem",
  marginBottom: "2rem",
}));

const ButtonMui = styled(Button)(({ theme }) => ({
  color: "#F2F2F2",
  backgroundColor: "#5680e9",
  width: "10rem",
  transition: "all 0.7s",
  "&:hover": {
    backgroundColor: "#84CEEB",
    color: "#254E58",
  },
}));

const FormDiv = styled("form")(({ theme }) => ({
  marginTop: "8rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const HeaderDiv = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.8rem",
  letterSpacing: "2px",
  marginBottom: "4rem",
  color: "#3AAFA9",
}));

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState("");

  const { state } = useContext(Context);
  const { user } = state;
  useEffect(() => {
    if (user !== null) navigate("/home");
  });
  const submithandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:8000/api/register", {
      name,
      email,
      password,
    });
    console.log("Register Response ", data);
    setSuccess(data);
    setOpen(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  const closeHandler = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <Container>
      <FormDiv>
        <HeaderDiv>Register</HeaderDiv>
        <FormControlDiv>
          <InputLabel>name</InputLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <AccessibilityNewIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControlDiv>
        <FormControlDiv>
          <InputLabel>Username</InputLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControlDiv>
        <FormControlDiv>
          <InputLabel>Password</InputLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <PasswordIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControlDiv>
        <ButtonMui onClick={submithandler}>Submit</ButtonMui>
      </FormDiv>
      {success && (
        <SuccessCard
          data={"Registration successful! Please Login"}
          open={open}
          close={closeHandler}
        />
      )}
    </Container>
  );
};

export default Register;
