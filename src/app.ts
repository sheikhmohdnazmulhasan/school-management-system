import express, { Application, Request, Response, } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// startup endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('server is running!')
});

// application route;
app.use('/api/v1', UserRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;