import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import TestApi from '../apis/test';
import * as util from '../libs/util';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('**** this is state ****' + 123456789);
        res.json(123456789);
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};
