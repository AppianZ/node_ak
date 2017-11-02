import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import Axios from 'axios';
import * as http from '../libs/axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')
        http.get(req, 'https://api.github.com/search/users', {
            data: {
                'q': 'appian'
            }
        })
            .then((data) => {
                console.log('--- axios 请求结束 ---')
                console.log(data.data)
                res.send(data.data)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};
