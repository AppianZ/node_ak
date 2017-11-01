import { Request } from '@types/express';
import axios from 'axios';
import appConfig from '../config/app.config';
let instanceAxios:any = axios.create();

instanceAxios.defaults.baseURL = appConfig.baseURL;

function ajax(req: Request, options: any = {}) {
/*  const headers = Object.assign({
    'x-auth-token': req['x-auth-token'] || '',
  }, options.headers || {});*/

  return instanceAxios({
    method: options.method || 'get',
    url: options.url,
    data: options.data || {},
    headers: options.headers,
  })
      .then(response => {
          console.log('---- axois instance respone ---');
          console.log(response)
      })
      .catch(error => {
      console.log(error)
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
