const express = require('express');
const cors = require('cors');
const db = require('./db');

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
app.get('/api/sales', async (req, res) => {
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

app.get('/api/activity', async (req, res) => {
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

app.get('/api/user', async (req, res) => {
    try {
        // Hardcoding user ID 1 for now
        const { rows } = await db.query('SELECT name, avatar FROM users WHERE id = 1');
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/stats', async (req, res) => {
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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
