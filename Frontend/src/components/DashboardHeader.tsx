import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { getUserData } from '../services/api';

// Define the type for the user data
interface UserData {
  name: string;
  avatar: string;
}

export default function DashboardHeader() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getUserData().then(data => {
      setUser(data as UserData);
    });
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <NavDropdown title={
                <>
                  <Image src={user.avatar} roundedCircle className="me-2" />
                  {user.name}
                </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
