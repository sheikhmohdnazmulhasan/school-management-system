import express, { Application, NextFunction, Request, Response, } from 'express';
import cors from 'cors';
import status from 'http-status';
import config from './app/config';
import Routes from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// startup endpoint
app.get('/', (req, res) => {
  res.status(status.OK).json({
    success: true,
    PORT: config.port,
    message: 'server is running!',

  });

});

// application route;
app.use('/api/v1', Routes);


// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || 'Something Wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });

});

app.all("*", (req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'endpoint not found',

  });

});

export default app;