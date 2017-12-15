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
    res.io = io;
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



/**
 * websocket work.
 */
var targetSocketArray = [];
var roomGroupList = [];
var allClients = [];

io.on('connection', function (socket) {
    allClients.push(socket);
    console.log('~~ connection' + socket.id);
    socket.on('disconnect', function () {
        socket.emit('disconnected');
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });

    socket.on('joinToRoom', function (data) {
        socket.join(data.roomGroupId)
        if(roomGroupList.indexOf(data.roomGroupId < 0)) {
            roomGroupList.push(data.roomGroupId);
        }
    })

    socket.on('addUser', function (data, func) {
        targetSocketArray.push(data.user);
        socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
            return item.roomGroupId == data.roomGroupId;
        }));
        func(targetSocketArray.filter(function (item) {
            return item.roomGroupId == data.roomGroupId;
        }));
    });

    socket.on('onTimeCount', function (data, func) {
        socket.in(data.roomGroupId).emit('timeDecrease', {
            isEnd: data.isStart == 2,
            isWait: data.isStart == 0,
            time: data.time
        });

        func({
            time : data.time,
            isStart: data.isStart,
        });
    });

    socket.on('increaseCount', function (data) {
        targetSocketArray.map(function(item) {
            if(item.id == data.id) {
                item.content = Object.assign({}, item.content, data.content);
            }
            return item;
        })
        socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
            return item.roomGroupId == data.roomGroupId;
        }));
    });

});



/**
 * node error.
 */

app.use(async(err, req: Request, res: Response, next: NextFunction) => {
  if (!err.response) { // node 挂了
    err = new Error(err);
    console.log(err,'-------这里是node挂了');
    // res.status(500);
   /* return res.baseRender('happy/feng', {
      error: {
        stack: '系统正在升级中 [-1500]'
      }
    });*/
  }

 /* if (err.response.status === 401) {
    console.log('--------- 401全局授权 --------');
    return res.baseRender('happy/feng', {
      redirectUrl: redirectUrl,
    });
  }*/
  console.error(err, '----------error 全局');
  next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  /*res.status(err.response.status || 500);
  res.baseRender('happy/feng', {
    message: req.originalUrl,
    error: {
      status: err.response.status,
      stack: errorTip[err.response.status]
    }
  });*/
  next(err);
});

app.use(function (req: Request, res: Response) {
 /* const err: any = new Error('这个页面不存在');
  err.status = 404;
  res.status(404);
  res.baseRender('happy/feng', {
    error: {
      stack: errorTip[err.status]
    }
  });*/
});


module.exports = {app: app, server: server};
