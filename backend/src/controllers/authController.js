const db = require('../../config/db');
const jwt = require('jsonwebtoken');

// IMPORTANT: This is a mock password for demonstration purposes.
// In a real application, you should use a secure password hashing library like bcrypt.
const MOCK_PASSWORD = 'PinnSight@123';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // For demonstration, we are checking against a hardcoded password.
  if (password !== MOCK_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  try {
    const { rows } = await db.query(
      'SELECT u.id, u.name, u.email, u.avatar, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = rows[0];

    // Only allow platform admins and managers to log in through this backend for now.
    const allowedRoles = ['Platform Super Admin', 'Platform Manager'];
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. This portal is for platform administrators only.' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'a_default_secret_key_for_development', // Use an environment variable for the secret
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
