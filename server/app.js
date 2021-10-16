import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from'helmet';
import authRouter from './router/auth.js';
import productRouter from './router/product.js';
import cartRouter from './router/cart.js';
import orderRouter from './router/order.js';
import chatRouter from './router/chat.js';
import { config } from './config.js';
import { csrfCheck } from './middleware/csrf.js';
import rateLimit from './middleware/rate-limiter.js';

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
app.use(rateLimit);

app.use(csrfCheck)
app.use('/auth', authRouter);

app.use('/products', productRouter);

app.use('/carts', cartRouter);

app.use('/orders', orderRouter)

app.use('/chats', chatRouter)

const server = app.listen(config.port);
export default server;

console.log('시작');

