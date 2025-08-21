const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeRoles } = require('./auth');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the PinnSight backend!');
});

// API Endpoints
app.get('/api/sales', authenticateToken, authorizeRoles('CEO/Executive', 'Finance Team'), async (req, res) => {
  try {
    const { rows } = await db.query('SELECT month, sales_amount AS sales FROM sales_monthly WHERE company_id = 1 ORDER BY month');
    // Simple mapping from month number to month name
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedRows = rows.map(row => ({
        name: monthNames[row.month - 1],
        sales: parseFloat(row.sales)
    }));
    res.json(formattedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/activity', authenticateToken, async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT t.id, u.name as user, t.amount, t.transaction_date as date, t.status
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.transaction_date DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        // Using the user ID from the token
        const userId = req.user.userId;
        const { rows } = await db.query('SELECT name, avatar FROM users WHERE id = $1', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/stats', authenticateToken, async (req, res) => {
    // For now, returning hardcoded data similar to the mock.
    // A real implementation would calculate these from the database.
    const statCardData = [
      { title: "Total Users", value: "8", iconName: "PeopleFill" },
      { title: "Revenue", value: "$28,289", iconName: "CashCoin" },
      { title: "New Signups", value: "2", iconName: "PersonPlusFill" },
      { title: "Open Tickets", value: "1", iconName: "TicketDetailedFill" },
    ];
    res.json(statCardData);
});


// Authentication Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
