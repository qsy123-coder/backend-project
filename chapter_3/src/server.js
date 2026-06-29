import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/auth",authRoutes)

app.listen(PORT, () => {
  console.log(`正在监听${PORT}`);
});
