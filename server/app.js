import express from 'express';
import { config } from './config.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


app.listen(config.host.port);