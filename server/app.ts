/*if(process.env.NODE_ENV === 'dev') {
 require('babel-core/register');
 require('babel-polyfill');
 }*/
import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';
import { getRedirectUrl, getFullUrl } from './libs/util';
import errorTip from './config/error.config';
import PlatformApi from './apis/platform';
import projectConfig from './config/project.config';
import sendDingding from './apis/exception';

const app = express();
app.set('trust proxy', true);
require('./config/init')(app, express);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.project = req.baseUrl || ' ';
  res.course = req.query.course || '1';
  next();
});

let routesFiles = fs.readdirSync(`./dist/router/`);
routesFiles.forEach((file) => {
  if (file.indexOf('.js') < 0) return;
  require(`./router/${file}`)(app);
});
for (let i in projectConfig) {
  routesFiles.forEach((file) => {
    if (file.indexOf('.js') < 0) return;
    require(`./router/${file}`)(app, projectConfig[i]);
  });
}

app.use(async(err, req: Request, res: Response, next: NextFunction) => {
  const redirectUrl = getRedirectUrl(req);
  const platformAlias = req.headers['x-wechat-application'] || 'test';
  const platform = await new PlatformApi(req).platform(platformAlias);
  if (!err.response) { // node 挂了
    err = new Error(err);
    if (process.env.NODE_ENV === 'production') {
      sendDingding.node(`${err.stack}\n${getFullUrl(req)}\n${req.headers['x-auth-token']}`);
    } else {
      console.log(err,'-------这里是node挂了');
    }
    res.status(500);
    return res.baseRender('common/error', {
      error: {
        stack: '系统正在升级中 [-1515]'
      }
    });
  }

  if (err.response.status === 401) {
    console.log('--------- 401全局授权 --------');
    return res.baseRender('common/loading', {
      appId: platform.appid,
      redirectUrl: redirectUrl,
    });
  }
  console.error(err, '----------error 全局');
  next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    sendDingding.java(err);
  }

  res.status(err.response.status || 500);
  res.baseRender('common/error', {
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
  res.baseRender('common/error', {
    error: {
      stack: errorTip[err.status]
    }
  });
});

export default app;
