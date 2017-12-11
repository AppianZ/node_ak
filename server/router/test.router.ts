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

        // res.io.on('connection', function (socket) {
        //     console.log('in connection callback--  ' , socket);
        //
        //     socket.on('joinToRoom', function (data) {
        //         socket.join(data.roomGroupId)
        //         console.log('--- joinToRoom ---- ' + data.roomGroupId);
        //         roomGroupList.push(data.roomGroupId);
        //     })
        //
        //     socket.on('addUser', function (data, func) {
        //         targetSocketArray.push(data.user);
        //         console.log('--- addUser ---- ' + targetSocketArray);
        //         socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
        //             return item.roomGroupId == data.roomGroupId;
        //         }));
        //         func(targetSocketArray);
        //     });
        //
        //     socket.on('increaseCount', function (data) {
        //         targetSocketArray.map(function(item) {
        //             if(item.id == data.id) {
        //                 item.content = Object.assign({}, item.content, data.content);
        //             }
        //             return item;
        //         })
        //         console.log('--- increaseCount ---- ' + targetSocketArray);
        //         socket.in(data.roomGroupId).emit('showUser', targetSocketArray.filter(function (item) {
        //             return item.roomGroupId == data.roomGroupId;
        //         }));
        //     });
        //
        // });

        console.log(res);

        res.baseRender('test/index', state);
    } catch (err) {
        next(err);
    }
});


module.exports = function (app) {
  app.use('/test', router);
};
