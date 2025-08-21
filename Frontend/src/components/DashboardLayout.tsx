import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUser } from '../context/UserContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navLinksByRole: Record<string, { to: string; text: string }[]> = {
  "Platform Super Admin": [
    { to: "/admin-dashboard", text: "Admin Dashboard" },
    { to: "/users", text: "Manage Users" },
    { to: "/settings", text: "Platform Settings" },
  ],
  "Platform Manager": [
    { to: "/admin-dashboard", text: "Admin Dashboard" },
    { to: "/users", text: "Manage Users" },
  ],
  "Company Admin": [
    { to: "/admin-dashboard", text: "Admin Dashboard" },
    { to: "/users", text: "Manage Users" },
  ],
  "CEO/Executive": [
    { to: "/dashboard", text: "CEO Dashboard" },
    { to: "/finance-dashboard", text: "Finance" },
    { to: "/reports", text: "Reports" },
  ],
  "Finance Team": [
    { to: "/finance-dashboard", text: "Finance Dashboard" },
    { to: "/reports", text: "Reports" },
  ],
  "Sales & Marketing": [
    { to: "/dashboard", text: "Sales Dashboard" },
  ],
  "Operations Team": [
    { to: "/dashboard", text: "Ops Dashboard" },
  ],
  "Basic User": [
    { to: "/dashboard", text: "My Dashboard" },
  ],
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { role } = useUser();
  const navLinks = role ? navLinksByRole[role] || [] : [];

  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper" className="bg-dark text-white vh-100">
          <Nav className="flex-column p-3">
            <div className="mb-4 h5">PinnSight</div>
            {navLinks.map((link) => (
              <LinkContainer to={link.to} key={link.to}>
                <Nav.Link className="text-white">{link.text}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
