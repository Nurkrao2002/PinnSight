import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper" className="bg-dark text-white vh-100">
          <Nav className="flex-column">
            <Nav.Link href="#home" className="text-white">Dashboard</Nav.Link>
            <Nav.Link href="#users" className="text-white">Users</Nav.Link>
            <Nav.Link href="#reports" className="text-white">Reports</Nav.Link>
            <Nav.Link href="#settings" className="text-white">Settings</Nav.Link>
          </Nav>
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
