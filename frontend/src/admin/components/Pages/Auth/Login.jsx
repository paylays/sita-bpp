import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Card, Container, Input, Form } from "reactstrap";
import axios from 'axios';

import logoLight from "../../../assets/images/logo-sita-bpp.png";
import logoDark from "../../../assets/images/logo-sita-bpp.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      console.log('Token dari server:', response.data.token);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Email atau password salah');
      console.log('Login error:', err.response ? err.response.data : err);
    }
  };

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <NavLink to="/" className="d-block auth-logo">
                      <img src={logoDark} alt="" height="30" className="auth-logo-dark" />
                      <img src={logoLight} alt="" height="30" className="auth-logo-light" />
                    </NavLink>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Admin !</h4>
                    <p className="text-muted text-center">Masuk untuk menuju ke halaman Dashboard.</p>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={handleLogin}
                    >
                      {/* Input Email */}
                      <div className="mb-3">
                        <Input
                          name="email"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Email"
                          type="email"
                          required
                        />
                      </div>

                      {/* Input Password */}
                      <div className="mb-3">
                        <Input
                          name="password"
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          type="password"
                          required
                          placeholder="Kata Sandi"
                        />
                      </div>

                      {/* Error Message */}
                      {error && <p className="text-danger text-center">{error}</p>}

                      {/* Remember me and Login Button */}
                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect waves-light" type="submit">
                            Log In
                          </button>
                        </div>
                      </div>

                      {/* Forgot Password Link */}
                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-4">
                          <NavLink to="/page-recoverpw" className="text-muted">
                            <i className="mdi mdi-lock"></i> Forgot your password?
                          </NavLink>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              {/* Footer Links */}
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <NavLink
                    to="/pages-register"
                    className="text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </NavLink>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Lexa
                  <span className="d-none d-sm-inline-block"> - Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand.</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
