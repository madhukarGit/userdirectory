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
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
}));

const FormControlDiv = styled(FormControl)(({ theme }) => ({
  width: "20rem",
  marginBottom: "2rem",
}));

const ButtonMui = styled(Button)(({ theme }) => ({
  color: "#D6CE15",
  backgroundColor: "#1F6521",
  width: "10rem",
  fontWeight: 500,
  letterSpacing: "2px",
  transition: "all 1s",
  "&:hover": {
    backgroundColor: "#53900F",
    color: "#D6CE15",
  },
}));

const ResetButtonMui = styled(Button)(({ theme }) => ({
  color: "#F64C72",
  backgroundColor: "#DAAD86",
  width: "10rem",
  "&:hover": {
    backgroundColor: "#DAAD86",
    color: "#10E7DC",
  },
}));

const FormDiv = styled("form")(({ theme }) => ({
  marginTop: "8rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const ResetDiv = styled(Typography)(({ theme }) => ({
  color: "#C34271",
  marginTop: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.4rem",
}));

const TextDiv = styled("div")(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 500,
  letterSpacing: "1px",
}));

const LinkRoute = styled(NavLink)(({ theme }) => ({
  fontSize: "0.8rem",
  textDecoration: "none",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "0.9rem",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState("");

  const { state, dispatch } = useContext(Context);

  const { user } = state;
  useEffect(() => {
    if (user !== null) navigate("/home");
  });

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      console.log("Register Response ", data);
      dispatch({ type: "LOGIN", payload: data });
      //save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      setSuccess(data);
      setOpen(true);
      setEmail("");
      setPassword("");
      toast.success("login successful");
    } catch (err) {
      toast.error("wrong password");
    }
  };

  return (
    <Container>
      <FormDiv>
        <FormControlDiv>
          <InputLabel>Username</InputLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled>
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
                <IconButton disabled>
                  <PasswordIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControlDiv>
        <ButtonMui onClick={submithandler}>Submit</ButtonMui>
        <ResetDiv>
          <TextDiv>Forgot your password ?</TextDiv>
          <ResetButtonMui>
            <LinkRoute
              to="reset"
              style={({ isActive }) => {
                return { color: isActive ? "#E85A4F" : "#747474" };
              }}
            >
              Reset Password
            </LinkRoute>
          </ResetButtonMui>
        </ResetDiv>
      </FormDiv>
    </Container>
  );
};

export default Login;
