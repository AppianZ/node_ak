import { Request } from '@types/express';
import axios from 'axios';
import appConfig from '../config/app.config';
let instanceAxios:any = axios.create();

instanceAxios.defaults.baseURL = appConfig.baseURL;
instanceAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        throw error;
    }
    return Promise.reject(error);
});

function generatorUrl(url: string, data: any = {}) {
    if (JSON.stringify(data) == '{}') return url;
    let queryArr = [];
    for(let i in data) {
        queryArr.push(`${i}=${data[i]}`)
    }
    return `${url}?${queryArr.join('&')}`
}

function ajax(req: Request, options: any = {}) {
    const method = options.method || 'get';
    const data = options.data || {};
    const url = method == 'get' ? generatorUrl(options.url, data) : options.url;

    /*   const headers = Object.assign({
     'x-auth-token': req['x-auth-token'] || '',
     }, options.headers || {});*/

    return instanceAxios({
        method,
        data,
        url,
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

    const data = options.data || {};

    return ajax(req, {
        url: url,
        method: 'post',
        data: type == 'json' ? JSON.stringify(data) : data,
        headers: headers || {},
    })
}
