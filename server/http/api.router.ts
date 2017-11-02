import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import TestApi from '../apis/test';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    const list = new TestApi(req).getUser('appian');
    try {
        const result = await list;
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/test', async function (req: Request, res: Response, next: NextFunction) {
    const list = new TestApi(req).getToken({
        "platform": "app",
        "type": "URL",
        "title": "google1",
        "address": "www.google.com",
        "status": "disabled"
    });
    try {
        const result = await list;
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};

