import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import Axios from 'axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')
        Axios.get('https://api.github.com/search/users?q=appian')
            .then((res) => {
                console.log('--- axios 请求结束 ---')
                console.log(res.data)
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
