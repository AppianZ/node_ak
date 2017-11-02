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
        // const $state = await http.get(this.req, `/test1?user=${user}`);
        const $state = {
            data : {
                name: user,
                id: 'testid123',
            }
        }
        return $state.data;
    }

    async getUser(name:string) {
        const list = await http.get(this.req, '/search/users', {
            data: {
                q: name
            }
        });
        console.log(list);
        return list.data;
    }
}

export default TestApi;
