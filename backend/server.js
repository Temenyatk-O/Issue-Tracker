const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const requiredEnv = ['JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_NAME'];
const missingEnv = requiredEnv.filter(
  (key) => process.env[key] === undefined || String(process.env[key]).trim() === ''
);
if (missingEnv.length > 0) {
  console.error('❌  Missing required environment variables:', missingEnv.join(', '));
  console.error('    Set the missing variables in backend/.env');
  process.exit(1);
}

const express    = require('express');
const cors       = require('cors');
const authRoutes  = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));


// All auth routes:   /api/auth/register, /api/auth/login
app.use('/api/auth',   authRoutes);
// All issue routes:  /api/issues (protected)
app.use('/api/issues', issueRoutes);

// Health check — includes DB connectivity
app.get('/api/health', async (req, res) => {
  const pool = require('./config/db');
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', timestamp: new Date() });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      db: 'disconnected',
      message: err.message,
      timestamp: new Date(),
    });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});
