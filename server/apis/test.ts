import * as http from '../libs/axios';
import { Request } from '@types/express';
/**
 * TestApi模块的api
 * @param req
 * @constructor
 */
class TestApi {
    private req: Request;
    constructor(req: Request) {
        this.req = req;
    }
    async getTestInit(user:string) {
        const $state = await http.get(this.req, `/test1?user=${user}`);
        return $state.data;
    }
}

export default TestApi;
