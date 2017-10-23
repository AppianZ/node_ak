import * as http from '../libs/axios';
import { Request } from '@types/express';
import projectConfig from '../config/project.config';

/**
 * 通用模块的Api类
 * @param req
 * @constructor
 */
class CommonApi {
  private req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  async wxConfig() {
    const app = this.req.headers['x-wechat-application'];
    const courseId = this.req.query.course;
    const {protocol, originalUrl} = this.req;
    let fullUrl = `${ protocol }://${ this.req.get('host') }/${app}${ originalUrl }`;
    // console.log(fullUrl, '-------fullurl 处理前');

    if (projectConfig[courseId]) {
      fullUrl = fullUrl.replace(`/${projectConfig[courseId]}`, '');
    }
    // console.log(fullUrl, '-------fullurl 处理后');
    let url = encodeURIComponent(fullUrl.split('#')[0]);
    let wx = await http.post(this.req, '/wx/js/signature', {
      data: `url=${url}`
    });
    return wx.data;
  }
}

export default CommonApi;
