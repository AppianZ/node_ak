import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';
import { getRedirectUrl, getFullUrl } from './libs/util';
import errorTip from './config/error.config';

const app = express();
app.set('trust proxy', true);
require('./config/init')(app, express);

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
  const redirectUrl = getRedirectUrl(req);
  if (!err.response) { // node 挂了
    err = new Error(err);
    console.log(err,'-------这里是node挂了');
    res.status(500);
    return res.baseRender('test/test', {
      error: {
        stack: '系统正在升级中 [-1500]'
      }
    });
  }

  if (err.response.status === 401) {
    console.log('--------- 401全局授权 --------');
    return res.baseRender('test/test', {
      redirectUrl: redirectUrl,
    });
  }
  console.error(err, '----------error 全局');
  next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.response.status || 500);
  res.baseRender('test/test', {
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
  res.baseRender('test/test', {
    error: {
      stack: errorTip[err.status]
    }
  });
});

export default app;
