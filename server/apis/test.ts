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
        return list.data;
    }

    async getToken(data:any) {
        const token = await http.post(this.req, '/v1/uac/oauth/token', {
            data,
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTllODNlN2NkZDdjNGE1MWI3MDM2ZmFjIiwidXNlcl9uYW1lIjoiNTllODNlN2NkZDdjNGE1MWI3MDM2ZmFjIiwic3lzdGVtX2lkIjoiYXBwX3BsYXRmb3JtIiwiZXh0cmEiOnt9LCJzY29wZSI6WyJvcGVuaWQiLCJ3cml0ZSIsInJlYWQiLCJzb3BfYmFzZSIsInNvcF91YWMiLCJzb3Atc29uaWMtc2VydmljZSIsInNvcC1jdXN0LXNlcnZpY2UiLCJzb3AtY3VzdC1wbGF0Zm9ybS1zZXJ2aWNlIiwic29wLWNvbnRlbnQtc2VydmljZSIsInNvcC1wdXNoLXNldHRpbmctc2VydmljZSIsInNvcC1hcHAtc2VydmljZSIsInNvcC1wbGF0Zm9ybSIsInNvcF9zbXMiLCJzb3BfbWFpbCJdLCJhdHRyaWJ1dGVzIjp7ImxvZ2luVHlwZSI6InVzZXJuYW1lIiwibmlja05hbWUiOiJ1c2VyXzEwMDAwMDAwMjA0In0sImV4cCI6MTUwOTQ5OTY1MywianRpIjoiY2QzN2IxNTAtYzMxZS00ZWJhLWI3OGEtY2U2NTdlMjNkYmYyIiwiY2xpZW50X2lkIjoic29wX2FwcF9wbGF0Zm9ybSJ9.F-1TKKdIxI9uwegGqOBSIP8lciQYHjPvy6X9pniaTJkEsaxG47e6ElKgEhBMQW9Sl1if4ygntCDFF--81ReOUHFoVAvZbJM_iB1ZGm92feWDdLV_I_LxxmRjO2ypyzk72Zc6KgNkq2UBzv4j0qvmdoDMEaqzx4oSRiAgMuy3exfD-5b3gVT2ss8SoFk_OF8T8SDfQu526KuBXsb3MoOg9pt1fMHDgyzh1u8K75IhaiJqWToCSim4WLwlUGV2aUH7caaiBWRGwLqwV5J0qj4Q2OjKmZqN1WcG9NOdgoQg5uopmfBozalaU4DB_SsyEP91215ED0i9ZVOKJE8F0R1TFg',
            },
        }, 'json');
        return token;
    }
}

export default TestApi;
