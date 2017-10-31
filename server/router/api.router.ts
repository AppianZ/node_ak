import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import { get, post } from '../libs/axios';
import Axios from 'axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')
        Axios.get('https://api.github.com/search/users?q=kodo')
            .then(function(data) {
                console.log('--- axios结束值 ---')
                console.log(JSON.stringify(data.data.items));
                res.send(JSON.stringify(data.data.items));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};
