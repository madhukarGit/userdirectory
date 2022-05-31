import {
  Box,
  styled,
  Typography,
  FormControl,
  Button,
  Input,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";
import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "14rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
}));

const FormControlDiv = styled(FormControl)(({ theme }) => ({
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  marginBottom: "2rem",
  "&:last-child": {
    marginBottom: "0rem",
  },
}));

const ButtonMui = styled(Button)(({ theme }) => ({
  color: "#C1C8E4",
  backgroundColor: "#5680e9",
  width: "10rem",
  "&:hover": {
    backgroundColor: "#84CEEB",
    color: "#254E58",
  },
}));

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) navigate("/home");
    try {
    } catch (error) {
      setLoading(false);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/forgot-password", { email });
      setSuccess(true);
      toast.success("Please check the email with six digit code !");
    } catch (error) {
      setSuccess(false);
      toast.error("Email is invalid");
      console.log(error);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          email,
          code,
          newPassword,
        }
      );
      setEmail("");
      setCode("");
      setNewPassword("");
      toast.success("Great! login with your new password");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Typography>Forgot Password</Typography>
      <form>
        <FormControlDiv>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </FormControlDiv>
        {success && (
          <React.Fragment>
            <FormControlDiv>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
              />
            </FormControlDiv>
            <FormControlDiv>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter email"
              />
            </FormControlDiv>
          </React.Fragment>
        )}
      </form>
      <ButtonMui onClick={success ? handleResetPassword : handleSubmit}>
        Submit
      </ButtonMui>
    </Container>
  );
};

export default ResetPassword;
