import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { getUsers, loginUser, registerUser } from './Controllers/UserController';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/register', registerUser);
app.use('/login', loginUser);
app.use('/users', getUsers);

//connect to mongodb
mongoose.connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.zmv6sz9.mongodb.net/?retryWrites=true&w=majority`,
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'failed to connect to mongodb'));
db.once('open', () => {
  console.log('Successfully connected to mongodb');
});

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
