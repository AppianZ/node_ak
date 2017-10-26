import { Request, Response, NextFunction } from "@types/express";
import * as http from '../libs/axios';
const expiresTime:number = 3 * 24 * 60 * 60 * 1000; // cookies 过期时间 3d
import * as util from '../libs/util';

export default async function (req:Request, res:Response, next:NextFunction) {
  const redirectUrl:string = util.getRedirectUrl(req);
  const debugid:string = req.query.debugid;
  const code:string = req.query.code;
  // console.log(redirectUrl, '------redirectUrl处理后');
  try {
    if (code || debugid) {
      const ret = await http.post(req, '/token', {
        method: 'post',
        data: debugid ? `debugId=${debugid}` : `code=${code}`,
      });

      // res设置cookie.x-auth-token
      res.cookie('x-auth-token', ret.data.token, {
        // domain: cookieDomain,
        maxAge: expiresTime,
      });

      req['x-auth-token'] = ret.data.token;
      next();
    } else {
      const token:string = req.cookies['x-auth-token'];
      if (token) {
        const ret = await http.post(req, '/token/check', {
          method: 'post',
          data: `token=${token}`
        });
        req['x-auth-token'] = token;
        next();
      } else {
        throw new Error("Not found x-auth-token in cookies");
      }
    }
  } catch (error) {
    const platformAlias:string = util.getApplication(req) || 'test';
    try {
      return res.baseRender('common/loading', {
        redirectUrl: redirectUrl,
      });
    } catch (err) {
      next(err);
    }
  }

};
