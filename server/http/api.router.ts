import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
// import checkToken from '../middleware/check.token';
import Axios from 'axios';
import * as http from '../libs/axios';

router.post('/auth', async function (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('--- axios开始请求值 ---')
        http.post(req, '/content/customer/content', {
            data: {
                "platform": "app",
                "type": "URL",
                "title": "google1",
                "address": "www.google.com",
                "status": "disabled"
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTllODNlN2NkZDdjNGE1MWI3MDM2ZmFjIiwidXNlcl9uYW1lIjoiNTllODNlN2NkZDdjNGE1MWI3MDM2ZmFjIiwic3lzdGVtX2lkIjoiYXBwX3BsYXRmb3JtIiwiZXh0cmEiOnt9LCJzY29wZSI6WyJvcGVuaWQiLCJ3cml0ZSIsInJlYWQiLCJzb3BfYmFzZSIsInNvcF91YWMiLCJzb3Atc29uaWMtc2VydmljZSIsInNvcC1jdXN0LXNlcnZpY2UiLCJzb3AtY3VzdC1wbGF0Zm9ybS1zZXJ2aWNlIiwic29wLWNvbnRlbnQtc2VydmljZSIsInNvcC1wdXNoLXNldHRpbmctc2VydmljZSIsInNvcC1hcHAtc2VydmljZSIsInNvcC1wbGF0Zm9ybSIsInNvcF9zbXMiLCJzb3BfbWFpbCJdLCJhdHRyaWJ1dGVzIjp7ImxvZ2luVHlwZSI6InVzZXJuYW1lIiwibmlja05hbWUiOiJ1c2VyXzEwMDAwMDAwMjA0In0sImV4cCI6MTUwOTQ5OTY1MywianRpIjoiY2QzN2IxNTAtYzMxZS00ZWJhLWI3OGEtY2U2NTdlMjNkYmYyIiwiY2xpZW50X2lkIjoic29wX2FwcF9wbGF0Zm9ybSJ9.F-1TKKdIxI9uwegGqOBSIP8lciQYHjPvy6X9pniaTJkEsaxG47e6ElKgEhBMQW9Sl1if4ygntCDFF--81ReOUHFoVAvZbJM_iB1ZGm92feWDdLV_I_LxxmRjO2ypyzk72Zc6KgNkq2UBzv4j0qvmdoDMEaqzx4oSRiAgMuy3exfD-5b3gVT2ss8SoFk_OF8T8SDfQu526KuBXsb3MoOg9pt1fMHDgyzh1u8K75IhaiJqWToCSim4WLwlUGV2aUH7caaiBWRGwLqwV5J0qj4Q2OjKmZqN1WcG9NOdgoQg5uopmfBozalaU4DB_SsyEP91215ED0i9ZVOKJE8F0R1TFg',
            },
        }, 'json')
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


/*try {
    console.log('--- axios开始请求值 ---')
    http.get(req, '/search/users', {
        data: {
            q: 'appian'
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
}*/
