import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';
import { getRedirectUrl, getFullUrl } from './libs/util';
import errorTip from './config/error.config';

const app = express();
app.set('trust proxy', true);
require('./config/init')(app, express);

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.project = req.baseUrl || ' ';
  next();
});

let routesFiles = fs.readdirSync(`./dist/router/`);
routesFiles.forEach((file) => {
  if (file.indexOf('.js') < 0) return;
  require(`./router/${file}`)(app);
});

let httpFiles = fs.readdirSync(`./dist/http/`);
httpFiles.forEach((file) => {
    if (file.indexOf('.js') < 0) return;
    require(`./http/${file}`)(app);
});


app.use(async(err, req: Request, res: Response, next: NextFunction) => {
  if (!err.response) { // node 挂了
    err = new Error(err);
    console.log(err,'-------这里是node挂了');
    res.status(500);
    return res.baseRender('happy/feng', {
      error: {
        stack: '系统正在升级中 [-1500]'
      }
    });
  }

  if (err.response.status === 401) {
    console.log('--------- 401全局授权 --------');
    return res.baseRender('happy/feng', {
      redirectUrl: redirectUrl,
    });
  }
  console.error(err, '----------error 全局');
  next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.response.status || 500);
  res.baseRender('happy/feng', {
    message: req.originalUrl,
    error: {
      status: err.response.status,
      stack: errorTip[err.response.status]
    }
  });
  next(err);
});

app.use(function (req: Request, res: Response) {
  const err: any = new Error('这个页面不存在');
  err.status = 404;
  res.status(404);
  res.baseRender('happy/feng', {
    error: {
      stack: errorTip[err.status]
    }
  });
});

/*
    adds socket.io to res in our event loop.
* */
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.io = io;
    next();
});

module.exports = {app: app, server: server};
