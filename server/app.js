import express from 'express';
import { config } from './config.js';
import cors from 'cors';
import authRouter from './router/auth.js';
const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth', authRouter);

app.listen(config.host.port);