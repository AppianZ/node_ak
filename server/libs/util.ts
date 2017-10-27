import { Request } from "@types/express";
import errConfig from '../config/error.config';

/**
 * 获取完整url
 * @param req
 * @returns {string}
 */

export function getFullUrl(req:Request) {
	let protocol = req.headers["x-forwarded-proto"];
	return `${ req.protocol }://${ req.get('host') }/${req.headers['x-wechat-application']}${ req.originalUrl }`;
}

/**
 * 判断是否是移动端访问
 * @param req
 * @returns {boolean}
 */
export function isMobile(req:Request) {
	const u = req.headers["user-agent"];
	return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
		|| u.indexOf('iPhone') > -1 || u.indexOf('Windows Phone') > -1;
}

/**
 * 获取url
 * @param req
 * @returns {string}
 */
export function getRedirectUrl(req) {
    const app = getApplication(req);
    let url = `${ req.protocol }://${ req.get('host')}/${app}${ req.baseUrl }${ req.path === '/' ? '' : req.path }`;

    const query = req.query;
    for ( let q in query ) {
        if (url.indexOf('?') < 0) {
            url = `${ url }?${ q }=${ query[q] }`;
        } else {
            url = `${ url }&${ q }=${ query[q] }`;
        }
    }
    return url;
}

/**
 * 获取当前是什么应用
 * @param req
 * @returns {string}
 */
export function getApplication(req:Request):string {
	return req.headers['x-wechat-application'];
}

/**
 * 渲染页面的方法
 * @param viewPath 页面路径 enroll/index
 * @param data  页面所需首屏数据
 */
export function baseRender(viewPath: string, data?: any) {
  const p = 'public';
  console.log(`${p}/views/${viewPath}`);

  if (Object.keys(errConfig).indexOf(String(this.statusCode)) > -1) {
    this.render(`${p}/views/${viewPath}`, data);
  } else {
    this.render(`${p}/views/${viewPath}`, {state: JSON.stringify(data)});
  }
}
