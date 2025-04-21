import React , {useState} from "react"
import { Row, Col, Image, Form, Button, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'

import axios from "axios"

import auth1 from '../../assets/images/auth/01.png'

const Login = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  let history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirim request POST ke backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Ambil token dari response
      const { token } = response.data;

      // Simpan token di localStorage atau dalam state aplikasi
      localStorage.setItem('authToken', token);

      // Redirect ke dashboard setelah login sukses
      history('/dashboard');
    } catch (error) {
      // Tangani error
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
            <Col md="6">
              <Row className="justify-content-center">
                  <Col md="10">
                    <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                        <Card.Body>
                          <h2 className="mb-2 text-center">Sign In</h2>
                          <p className="text-center">Login untuk dashboard.</p>
                          {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
                          <Form onSubmit={handleLogin}>
                              <Row>
                                <Col lg="12">
                                    <Form.Group className="form-group">
                                      <Form.Label htmlFor="email" className="">Email</Form.Label>
                                      <Form.Control
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                      />
                                    </Form.Group >
                                </Col>
                                <Col lg="12" className="">
                                    <Form.Group className="form-group">
                                      <Form.Label htmlFor="password" className="">Password</Form.Label>
                                      <Form.Control
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                      />
                                    </Form.Group>
                                </Col>
                              </Row>
                              <div className="d-flex justify-content-center">
                                <Button type="submit" variant="btn btn-primary">Sign In</Button>
                              </div>
                          </Form>
                        </Card.Body>
                    </Card>
                  </Col>
              </Row>
            </Col>
            <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
              <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
            </Col>
        </Row>
      </section>
    </>
  )
}

export default Login