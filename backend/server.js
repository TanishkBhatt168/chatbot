import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running with PostgreSQL connected');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
