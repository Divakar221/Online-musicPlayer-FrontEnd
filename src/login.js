import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Link, Alert } from "@mui/material";

function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [errorOccur, seterrorOccur] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        seterrorOccur(true);
      } else {
        var response = await axios.post(
          "https://online-musicplayer.herokuapp.com/signin",
          {
            email: email,
            password: password,
          }
        );
        console.log(response);
        if (response.data) {
          await localStorage.setItem("token", response.data);
          await localStorage.setItem("userEmail", email);

          navigate("/home");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{}} className="login">
      <Typography variant="h4" component="div" paddingTop="30px">
        {" "}
        LoginPage{" "}
      </Typography>{" "}
      <br /> <br />
      {errorOccur && (
        <Alert severity="error" style={{ width: "30%" }}>
          Please enter email/password!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="email"
            label="Email"
            color="success"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>{" "}
        <br />
        <div>
          {/* <TextField label="Password" type="password" variant="filled"  focused /> */}
          <TextField
            label="Password"
            type="password"
            name="password"
            color="success"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>{" "}
        <br />
        <Button variant="contained" type="submit">
          {" "}
          Login{" "}
        </Button>
        <br />
        <Link href="/register">New user? Register</Link>
      </form>
    </div>
  );
}

export default LoginComponent;
