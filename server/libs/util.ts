import { Request} from "@types/express";
import projectConfig from '../config/project.config';
import errConfig from '../config/error.config';

/**
 * 微信授权
 * @param appId
 * @param redirect_url
 * @returns {string}
 */
export function wxAuthUrl(appId:string, redirect_url:string) {
	redirect_url = encodeURIComponent(redirect_url);
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_base#wechat_redirect`
}

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
 * 获取重定向url
 * @param req
 * @returns {string}
 */
export function getRedirectUrl(req) {
  const app = getApplication(req);
  const courseId = req.query.course;
	let url = `${ req.protocol }://${ req.get('host')}/${app}${ req.baseUrl }${ req.path === '/' ? '' : req.path }`;

	const query = req.query;
	for ( let q in query ) {
		if (q !== 'state' && q !== 'code') {
			if (url.indexOf('?') < 0) {
				url = `${ url }?${ q }=${ query[q] }`;
			} else {
				url = `${ url }&${ q }=${ query[q] }`;
			}
		}
	}
	// /oxy/oxy/enroll/?course=2
	// return /oxy/enroll/?course=2
	// console.log(url, '-------重定向url处理前');
	// const urlArr = `/${req.headers['x-wechat-application']}${ req.baseUrl }`.split('/').sort();
	// const isRepeat = urlArr.filter((item, index) => item === urlArr[index + 1]);
	if (projectConfig[courseId]) {
		return url.replace(`/${projectConfig[courseId]}`, '');
	}
	return url;
}

/**
 * 获取当前是什么应用  example o2 test
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
  let p;
  if (!this.project) {
    p = 'public'
  } else {
    /*const merge = [...Object.keys(projectConfig), ...this.project.split('/')].sort();
    const isRepeat = merge.filter((item, index) => {
      return item === merge[index + 1];
    });*/
    if (projectConfig[this.course]) {
      p = `public_${projectConfig[this.course]}`;
    } else {
      p = 'public';
    }
  }
  // console.log(`${p}/views/${viewPath}`);

  if (Object.keys(errConfig).indexOf(String(this.statusCode)) > -1) {
    this.render(`${p}/views/${viewPath}`, data);
  } else {
    this.render(`${p}/views/${viewPath}`, {state: JSON.stringify(data)});
  }
}
