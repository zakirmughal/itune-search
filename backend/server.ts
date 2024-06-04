import {createServer, IncomingMessage, ServerResponse} from "http";
import Helmet from "helmet";
import cors from "cors";
import express, {Express, Request, Response} from 'express';
import {AddressInfo} from 'net'
import apiRoutes from "./src/index";

// function to initialize chat server over express
export const apiServer = async () => {
  const router: express.Router = express.Router();
  const app = express();
  const serverPort = 8080;

  app.get('/', (req: Request, res: Response) => {
    res.send("hello word!")
  });

  app.set('port', serverPort);

// setup and start the HTTP server
  const server = createServer(app);

  server.on('error', (error) => {
    console.error({err: error}, 'HTTP server error');
  });

  app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

// use helmet for security and setting various HTTP headers
  app.use(Helmet());

// use CORS to handle allow cross origin issue.
  const corsOptions = {
    origin: '*',
    methods: ["GET", "POST"]
  }
  app.use(cors<Request>(corsOptions));

// user API routes and send IO to API

  app.use('/api', apiRoutes);

  server.on('listening', () => {
    const {port, address} = server.address() as AddressInfo;
    console.info({port}, 'Server listening');
  });

// Workers can share any TCP connection
// In this case it is an HTTP server
  await server.listen(serverPort);
  return server;
};
