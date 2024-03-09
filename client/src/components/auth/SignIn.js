import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Card, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import ConnectWalletButton from "./ConnectWalletButton";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow" style={{ width: "25rem" }}>
        <h2 className="mb-4 text-center">Log In</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-end"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-end"
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Log In
          </Button>
        </Form>
        <ConnectWalletButton />
        <hr />
        <div className="text-center mt-3">
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
