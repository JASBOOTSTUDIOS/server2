import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import usersAccessRoutes from './routes/usersRouter'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/',usersAccessRoutes)

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});