# 第二节：从项目入口文件看开去
## NPM
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
> Default env is local.

When the env is local, use ` npm run start ` to exec process.dev.json
When the env is test, use ` npm run start:test ` to exec process.test.json
When the env is production,  use  ` npm run start:prod` to exec process.prod.json

> The `process.json` is the entry-file in PM2. We'll discuss it in following content.
> 
> We just need to know that `process.test.json` is same to `process.prod.json` except the name of object.
> 
> And the difference between `process.dev.json` and them is the `watch` option.


### /process.json

>  The config of `process.json` will help it to manage files when PM2 exec the command to run a server.
> 
> The `name` is a symbol of the progress.  You can recognize it with `pm2 list`.
> 
> The `script` is an entry of the config. The http-server in this file will start.
> 
> [Get more information](http://pm2.keymetrics.io/docs/usage/application-declaration/)


### /server/bin/www.ts
> You must notice the `script` of process.json is `./dist/bin/www.js` 
> 
> `./dist/bin/www.js` is compiled by `./server/bin/www.ts`
>
> The most significant work in `./server/bin/www.ts` is to create server using the formatting port that is defined throught the different envs.
>
> The relation between prots and envs is defined in `/server/config/app.config.ts`

### /server/config/app.config.ts
> This file define the relation between prots and envs 
>
> And the attribute `baseurl` will be used in axios.

### /server/libs/axios.ts
> The request interceptor based on axios.


## Gulp
### gulp build
> This command will compile typescript to JavaScript

### gulp -e [test | qa | prod] -p <project-name> -t [multi | spa]
>  `e` or `env` means the env you wanna to update.
> 
>  `p` or `project` assign the project you wanna to update.
> 
>  `t` or `type` assign the type of project you wanna to update.
