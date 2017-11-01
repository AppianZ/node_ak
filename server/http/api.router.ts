import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
// import Axios from 'axios';
import * as http from '../libs/axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')

        let res = await http.get(req, `search/users`, {
            data: {
                "q": "appian",
            },
        });
        console.log(res);
        console.log('--- axios 结束值 ---')
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};
