import express from 'express';
// import { sequelize } from './src/config/db.js';
import session from 'express-session';
import FileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import path from 'path';
import os from 'os';

config();

const app = express();

const FileStoreSession = FileStore(session);


class Server {
  constructor() {
    this.app = express();
    // aqui vai os sites permitidos do CORS
    this.whiteList = [];

    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddlewares() {
    // aqui você configura ao seu gosto
    const corsOptions = {
      origin: (origin, callback) => {
        if (this.whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by cors"));
        }
      },
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());

    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use(
      session({
        name: "session",
        secret: "akdkwodofefgneogeonmefnepddm",
        resave: false,
        saveUninitialized: false,
        store: new FileStoreSession({
          logFn: function () { },
          path: path.join(os.tmpdir(), "sessions"),
        }),
        cookie: {
          secure: false,
          maxAge: 28800000,
          httpOnly: true,
        },
      })
    );

    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      if (req.session.userId) {
        res.locals.session = req.session;
      }
      next();
    });
  }

  configureRoutes() {
    // coloque suas rotas aqui
  }

  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

export default Server;