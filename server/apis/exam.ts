/**
 * Created by Hsin on 2017/6/8.
 */
import * as http from '../libs/axios';
import { Request } from '@types/express';
/**
 * ExamApi模块的API类
 * @param req
 * @constructor
 */
class ExamApi {
  private req: Request;

  constructor(req: Request) {
    this.req = req;
  }
  async getExamInit(examId:string, course:string = '1') {
    const $state = await http.get(this.req, `/exam/init/${examId}?course=${course}`);
    return $state.data;
  }
  async getAnalysis(examId:string, course:string = '1') {
    const $state = await http.get(this.req, `/exam/analysis/${examId}?course=${course}`);
    return $state.data;
  }
}

export default ExamApi;
