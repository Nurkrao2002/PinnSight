const db = require('../../config/db');

// Get all tenants
const getAllTenants = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tenants ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single tenant by ID
const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM tenants WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error fetching tenant ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new tenant
const createTenant = async (req, res) => {
  const { id, name, plan, status } = req.body;
  if (!id || !name || !plan || !status) {
    return res.status(400).json({ message: 'ID, name, plan, and status are required.' });
  }

  try {
    const { rows } = await db.query(
      'INSERT INTO tenants (id, name, plan, users_count, last_active, status) VALUES ($1, $2, $3, 0, NOW(), $4) RETURNING *',
      [id, name, plan, status]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a tenant
const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { name, plan, status } = req.body;

  if (!name || !plan || !status) {
    return res.status(400).json({ message: 'Name, plan, and status are required.' });
  }

  try {
    const { rows } = await db.query(
      'UPDATE tenants SET name = $1, plan = $2, status = $3, last_active = NOW() WHERE id = $4 RETURNING *',
      [name, plan, status, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error updating tenant ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a tenant
const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM tenants WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(`Error deleting tenant ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
};
