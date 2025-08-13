require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


// Basic Route
app.get('/', (req, res) => {
  res.send('PinnSight Backend is running!');
});

// Routes
const authRoutes = require('./src/routes/auth');
const tenantRoutes = require('./src/routes/tenants');
const supportTicketRoutes = require('./src/routes/supportTickets');
const userRoutes = require('./src/routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/support-tickets', supportTicketRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
