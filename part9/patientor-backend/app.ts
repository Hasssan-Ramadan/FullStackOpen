import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (_req, res) => {
 res.send('pong');
});

app.listen(process.env.PORT, () => {
 console.log(`Server running on port ${process.env.PORT}`);
});