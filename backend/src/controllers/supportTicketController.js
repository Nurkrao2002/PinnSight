const db = require('../../config/db');

// Get all support tickets
const getAllSupportTickets = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT st.id, st.subject, st.priority, st.status, st.created_at, st.last_updated_at, t.name as tenant_name, u.name as user_name
       FROM support_tickets st
       LEFT JOIN tenants t ON st.tenant_id = t.id
       LEFT JOIN users u ON st.user_id = u.id
       ORDER BY st.last_updated_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllSupportTickets,
};
