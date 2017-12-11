import errConfig from '../config/error.config';

/**
 * 渲染页面的方法
 * @param viewPath 页面路径
 * @param data  页面所需首屏数据
 */
export function baseRender(viewPath: string, data?: any) {
  const p = 'public';
  console.log(`+++ node/libs/util.js - viewPath +++ ${p}/views/${viewPath}`);
  console.log(`+++ node/libs/util.js - data +++ ${JSON.stringify(data)}`);

  if (Object.keys(errConfig).indexOf(String(this.statusCode)) > -1) {
    this.render(`${p}/views/${viewPath}`, data);
  } else {
    this.render(`${p}/views/${viewPath}`, {state: JSON.stringify(data)});
  }
}


/**
 * 获取重定向url
 * @param req
 * @returns {string}
 */
export function getRedirectUrl(req) {
    const app = getApplication(req);
    let url = `${ req.protocol }://${ req.get('host')}/${app}${ req.baseUrl }${ req.path === '/' ? '' : req.path }`;
    const query = req.query;
    for (let q in query) {
        if (q !== 'state' && q !== 'code') {
            if (url.indexOf('?') < 0) {
                url = `${ url }?${ q }=${ query[q] }`;
            } else {
                url = `${ url }&${ q }=${ query[q] }`;
            }
        }
    }
    return url;
}

/**
 * 获取完整url
 * @param req
 * @returns {string}
 */

export function getFullUrl(req: Request) {
    let protocol = req.headers["x-forwarded-proto"];
    return `${ req.protocol }://${ req.get('host') }/${req.headers['x-wechat-application']}${ req.originalUrl }`;
}
