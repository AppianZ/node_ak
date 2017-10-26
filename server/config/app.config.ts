// server 环境配置
const env = process.env.NODE_ENV;

const common = {};

const test = {
    port: '3000',
    baseURL: 'http://localhost:8081',
};

const pro = {
    port: '3000',
    baseURL: 'http://localhost:8081',
};

const local = {
    port: '1515',
    baseURL: 'http://192.168.5.237:8081/api/',
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
