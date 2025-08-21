import { useState } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const roles = [
  "Platform Super Admin",
  "Platform Manager",
  "Company Admin",
  "CEO/Executive",
  "Finance Team",
  "Sales & Marketing",
  "Operations Team",
  "Basic User"
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);

    switch (selectedRole) {
      case "Platform Super Admin":
      case "Platform Manager":
      case "Company Admin":
        navigate('/admin-dashboard');
        break;
      case "Finance Team":
      case "CEO/Executive": // Also sending CEO to finance dashboard
        navigate('/finance-dashboard');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '24rem' }}>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="font-weight-bold">PinnSight</h2>
                <p className="text-muted">Enter your credentials to access your dashboard</p>
              </div>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
