import express from 'express'
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/auth', authRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', index.html));
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})