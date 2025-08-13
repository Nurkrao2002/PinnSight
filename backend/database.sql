-- Drop tables if they exist to start from a clean slate
DROP TABLE IF EXISTS support_tickets;
DROP TABLE IF EXISTS tenant_users;
DROP TABLE IF EXISTS tenants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Create users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    role_id INT,
    password_hash VARCHAR(255), -- For future use, not implemented in mock data
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create tenants table
CREATE TABLE tenants (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(50),
    users_count INT,
    last_active VARCHAR(255),
    status VARCHAR(50)
);

-- Create a join table for users and tenants
CREATE TABLE tenant_users (
    user_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, tenant_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);


-- Create support_tickets table
CREATE TABLE support_tickets (
    id VARCHAR(255) PRIMARY KEY,
    subject TEXT NOT NULL,
    tenant_id VARCHAR(255),
    user_id VARCHAR(255),
    priority VARCHAR(50),
    status VARCHAR(50),
    created_at TIMESTAMPTZ,
    last_updated_at TIMESTAMPTZ,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert roles
INSERT INTO roles (name) VALUES
('Platform Super Admin'),
('Platform Manager'),
('Company Admin'),
('CEO/Executive'),
('Finance Team'),
('Sales & Marketing'),
('Operations Team'),
('Basic User');

-- Insert tenants
INSERT INTO tenants (id, name, plan, users_count, last_active, status) VALUES
('ten_srisys', 'Srisys Inc.', 'Enterprise', 25, '2 hours ago', 'Active'),
('ten_pigeon', 'Pigeon-Tech', 'Enterprise', 6, '5 minutes ago', 'Active'),
('ten_2', 'Innovate Inc.', 'Paid', 10, '1 day ago', 'Active'),
('ten_3', 'Synergy Labs', 'Trial', 5, '3 days ago', 'Provisioning'),
('ten_4', 'QuantumLeap', 'Paid', 15, '5 hours ago', 'Active'),
('ten_5', 'DataWeavers', 'Free', 2, '1 week ago', 'Suspended');


-- Insert users
-- Note: Passwords are not included as per the mock data structure.
-- The company is derived from the email for association.
INSERT INTO users (id, name, email, role_id, avatar) VALUES
('usr_1', 'Alice Johnson', 'admin@srisys.com', (SELECT id FROM roles WHERE name = 'Company Admin'), 'https://i.pravatar.cc/150?u=a042581f4e29026704d'),
('usr_2', 'Robert Williams', 'finance@srisys.com', (SELECT id FROM roles WHERE name = 'Finance Team'), 'https://i.pravatar.cc/150?u=a042581f4e29026704e'),
('usr_3', 'Charles Brown', 'sales@srisys.com', (SELECT id FROM roles WHERE name = 'Sales & Marketing'), 'https://i.pravatar.cc/150?u=a04258114e29026702d'),
('usr_4', 'Diane Prince', 'ops@srisys.com', (SELECT id FROM roles WHERE name = 'Operations Team'), 'https://i.pravatar.cc/150?u=a048581f4e29026701d'),
('usr_5', 'Edward Hunt', 'user@srisys.com', (SELECT id FROM roles WHERE name = 'Basic User'), 'https://i.pravatar.cc/150?u=a092581f4e29026703d'),
('usr_6', 'Francis Castle', 'ceo@srisys.com', (SELECT id FROM roles WHERE name = 'CEO/Executive'), 'https://i.pravatar.cc/150?u=ceo-srisys'),
('usr_11', 'Peter Quill', 'ceo@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'CEO/Executive'), 'https://i.pravatar.cc/150?u=ceo-pigeon'),
('usr_12', 'Gamora Titan', 'admin@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'Company Admin'), 'https://i.pravatar.cc/150?u=admin-pigeon'),
('usr_13', 'Drax Destroyer', 'ops@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'Operations Team'), 'https://i.pravatar.cc/150?u=ops-pigeon'),
('usr_14', 'Rocket Raccoon', 'finance@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'Finance Team'), 'https://i.pravatar.cc/150?u=finance-pigeon'),
('usr_15', 'Groot Flora', 'sales@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'Sales & Marketing'), 'https://i.pravatar.cc/150?u=sales-pigeon'),
('usr_16', 'Mantis empath', 'user@pigeon-tech.com', (SELECT id FROM roles WHERE name = 'Basic User'), 'https://i.pravatar.cc/150?u=user-pigeon'),
('usr_7', 'Grace Lee', 'super@pinnsight.com', (SELECT id FROM roles WHERE name = 'Platform Super Admin'), 'https://i.pravatar.cc/150?u=super'),
('usr_8', 'Helen Turner', 'manager@pinnsight.com', (SELECT id FROM roles WHERE name = 'Platform Manager'), 'https://i.pravatar.cc/150?u=manager');

-- Associate users with tenants
INSERT INTO tenant_users (user_id, tenant_id) VALUES
('usr_1', 'ten_srisys'),
('usr_2', 'ten_srisys'),
('usr_3', 'ten_srisys'),
('usr_4', 'ten_srisys'),
('usr_5', 'ten_srisys'),
('usr_6', 'ten_srisys'),
('usr_11', 'ten_pigeon'),
('usr_12', 'ten_pigeon'),
('usr_13', 'ten_pigeon'),
('usr_14', 'ten_pigeon'),
('usr_15', 'ten_pigeon'),
('usr_16', 'ten_pigeon');

-- Insert support tickets
INSERT INTO support_tickets (id, subject, tenant_id, user_id, priority, status, created_at, last_updated_at) VALUES
('T-1234', 'Integration with Salesforce failing', 'ten_2', null, 'High', 'Open', '2025-07-25T10:00:00Z', '2025-07-25T14:30:00Z'),
('T-1235', 'How to add a new user?', 'ten_4', null, 'Low', 'Closed', '2025-07-24T11:00:00Z', '2025-07-24T11:30:00Z'),
('T-1236', 'API rate limit exceeded', 'ten_5', null, 'Medium', 'In Progress', '2025-07-25T09:00:00Z', '2025-07-25T16:00:00Z'),
('T-1237', 'Cannot access reports', 'ten_srisys', 'usr_6', 'High', 'Open', '2025-07-25T15:00:00Z', '2025-07-25T15:05:00Z'),
('T-1238', 'Feature request: Dark mode', 'ten_3', null, 'Low', 'Resolved', '2025-07-22T18:00:00Z', '2025-07-23T10:00:00Z'),
('T-1239', 'Billing question', 'ten_2', null, 'Medium', 'Open', '2025-07-26T08:00:00Z', '2025-07-26T08:15:00Z');
