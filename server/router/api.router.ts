import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import { get, post } from '../libs/axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        post(req, 'api/v1/uac/oauth/token', {
            headers: {
                Authorization: 'Basic c29wX2FwcF9wbGF0Zm9ybTpZWEJ3Y0d4aGRHWnZjbTFmYzJWamNtVjA='
            },
            data: {
                grant_type: 'password',
                username : '15160039391',
                password: '151600393912017'
            }
        }).then(data => {
            res.send(data);
        })
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};
