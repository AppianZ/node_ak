import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import TestApi from '../apis/test';
import * as util from '../libs/util';

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    const user = req.query.user || 'testuser1';

    const $state = new TestApi(req).getTestInit(user);
    console.log('**** this is state ****' + JSON.stringify($state));
    try {
        const state:any = await $state;
        // state.app = util.getApplication(req);
        res.baseRender('test/index', state);
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/test', router);
};
