import React from 'react';
import { Card } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

interface StatCardProps {
  title: string;
  value: string;
  iconName: keyof typeof Icon;
}

export default function StatCard({ title, value, iconName }: StatCardProps) {
  const BootstrapIcon = Icon[iconName];

  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="me-3">
            <BootstrapIcon size={40} />
          </div>
          <div>
            <div className="text-muted">{title}</div>
            <div className="h4">{value}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
