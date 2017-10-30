import '@types/node';

import { Response } from 'express';

declare module 'express' {
  interface Response {
    project: string,
    baseRender: (viewPath: string, data?: any) => void
  }
}

/*declare global {
 namespace NodeJS {
 interface Global {
 resRender: any,
 }
 interface http {
 myRender: (res: Response, viewPath: string, data?: any) => void
 }
 }
 }

 declare global {
 const resRender: (res: Response, viewPath: string, data?: any) => void;
 }*/