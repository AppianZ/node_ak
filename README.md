# Node

## 从npm上看出去
### /package.json
There are 3 envs for public. You can use option to set diff envs.
```
npm run start:[option]
npm run restart:[option]
```

> **option**: use to describe the public env.
> 
> Recognised type values are: **local**, **test**, **prod**
>
> default env is local.

 ```
 // 本地环境下执行process.test.json
 npm run start
```

 ```
 // 本地环境下执行process.json
 npm run start:test
 npm run start:prod
```

> process.json 和 process.test.json 相差一个watch

### /process.json

> pm2在执行的时候,会利用process.json的配置来管理文件
> 
> 其中 script 作为pm2执行的入口文件


### /server/bin/www.ts
> process.json中的script指向了./dist/bin/www.js, 
> 
> ./dist/bin/www.js 是由 ./server/bin/www.ts 编译而成的
>
> ./server/bin/www.ts做的最重要的事就是根据../config/app.config的端口配制起服务

### /server/config/app.config.ts
> 在这个ts中动态配置出不同env下的port.
>
> 并且这个文件中配置的url,会在封装好的axios中使用


### /server/libs/axios.ts
> appConfig.baseUR作为请求的基本url, 详细的请求路径可以根据文档详细配置


## 从gulp看出去
### gulp做的最重要的事就是编译typescript
### gulp还做了一件事,就是为node项目同步前端的静态资源。利用rsync.sh来同步服务器上的代码


## 回头看看/server/bin/www.ts
>  利用 express 的 http 模块 createServer 发起一个服务,并监听 port
>
> 
