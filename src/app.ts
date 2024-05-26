import express, { Application, NextFunction, Request, Response, } from 'express';
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


// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || 'Something Wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });

})

export default app;