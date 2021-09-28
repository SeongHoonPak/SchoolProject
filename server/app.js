import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from'helmet';
import authRouter from './router/auth.js';
import productRouter from './router/product.js';
import { config } from './config.js';
const app = express();
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionSuccessStatus: 200,
    credentials: true,
}
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(cors(corsOption));

app.use('/auth', authRouter);

app.use('/products', productRouter);


app.listen(config.port);
console.log('시작');