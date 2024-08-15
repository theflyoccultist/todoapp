import express from 'express'
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/auth', authRoutes)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})