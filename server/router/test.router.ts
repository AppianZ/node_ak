import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import TestApi from '../apis/test';
import * as util from '../libs/util';

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    const user = req.query.user || 'testuser1';

    const $state = new TestApi(req).getTestInit(user);
    try {
        const state:any = await $state;

        /**
         * websocket work.
         */
        var targetSocketArray = [];
        var roomGroupList = [];
        var allClients = [];

        res.io.on('connection', function (socket) {
            allClients.push(socket);
            console.log('~~ connection' + socket.id);
            socket.on('disconnect', function (data) {
                socket.emit('disconnected');
                console.log(data);
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
                console.log ('aaaaa--- ' + data.isStart);
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

        res.baseRender('test/index', state);
    } catch (err) {
        next(err);
    }
});


router.get('/test', async function (req: Request, res: Response, next: NextFunction) {

    try {
        res.baseRender('test/test', {
            msg: 'okkkkk'
        });
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/test', router);
};
