const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Fix: Configure CORS correctly
app.use(cors({
  origin: 'http://localhost:3000', // Allow only frontend requests
  credentials: true, // Allow cookies, authentication headers
  methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
}));

app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
