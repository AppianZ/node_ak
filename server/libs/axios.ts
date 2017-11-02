import { Request } from '@types/express';
import axios from 'axios';
import appConfig from '../config/app.config';

axios.defaults.baseURL = appConfig.baseURL;
/*instanceAxios.interceptors.response.use(function (response) {
    // console.log(response,'-------axios,response')
    return response;
}, function (error) {
    if (error.response.status === 401) {
        throw error;
    }
    return Promise.reject(error);
});*/

function ajax(req: Request, options: any = {}) {
/*   const headers = Object.assign({
    'x-auth-token': req['x-auth-token'] || '',
    }, options.headers || {});*/

    return axios({
        method: options.method || 'get',
        url: options.url,
        data: options.data || {},
        headers: options.headers || {},
    })
}

export function get(req: Request, url: string, options: any = {}) {
    return ajax(req, {
        url: url,
        data: options.data || {},
        headers: options.headers || {},
    })
}

export function post(req: Request, url: string, options: any = {}, type?: string) {
    type = type || 'form';
    const contentType = {
        'form': 'application/x-www-form-urlencoded',
        'data': 'application/form-data',
        'json': 'application/json'
    };
    const headers = Object.assign({
        'Content-Type': contentType[type]
    }, options.headers || {});

    return ajax(req, {
        url: url,
        method: 'post',
        data: options.data || {},
        headers: headers || {},
    })
}
