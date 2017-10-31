import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import Axios from 'axios';

var instance = axios.create({
    baseURL: 'http://54.222.196.128:8081/api',
    timeout: 1000,

});


router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')
        Axios({
            method:'post',
            baseURL: 'http://54.222.196.128:8081/api',
            url:'/v1/uac/oauth/token',
            headers: {'Authorization': 'Basic c29wX2FwcF9wbGF0Zm9ybTpZWEJ3Y0d4aGRHWnZjbTFmYzJWamNtVjA=',
                'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                grant_type: 'password',
                username: 15160039391,
                password: 151600393912017
            },
        })
            .then(function(data) {
                console.log('--- axios结束值 ---')
                console.log(data.access_token);
                res.send(data.access_token);
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
