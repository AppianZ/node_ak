// server 环境配置
const env = process.env.NODE_ENV;

const common = {};

const test = {
    port: '3000',
    baseURL: 'http://localhost:8082',
    cookieDomain: '.test.fyshuyuan.com',
};

const pro = {
    port: '3000',
    baseURL: 'http://localhost:8082',
    debugUrl: 'http://localhost:8088',
    cookieDomain: '.fyshuyuan.com',
};

const local = {
    port: '1515',
    baseURL: 'http://api.test.fyshuyuan.com/test',
    debugUrl: 'http://120.77.144.1:8088',
    cookieDomain: 'localhost',
};

let config;
switch (env) {
    case "production":
        config = Object.assign(pro, common);
        break;
    case "test":
        config = Object.assign(test, common);
        break;
    default:
        config = Object.assign(local, common);
        break;
}

export default config;
