const db = require('../../config/db');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT u.id, u.name, u.email, u.avatar, r.name as role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       ORDER BY u.name ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
};
