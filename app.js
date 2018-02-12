const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const path = require('path')
// const wechat = require('./wechat/g')//这个是微信获取access_token的代码逻辑
// const util = require('./libs/util')//这个辅助代码的实现

//在这里我们需要新建一个文件夹config，里面新建一个wechat.txt
// const wechat_file = path.join(__dirname, './config/wechat.txt')
// //这个是配置文件
// const config = {
//   wechat: {
//       // appID: 'wx1488122720c9e7e0',
//       // appSecret: '8318c525b43e353955251c95f7f6fc9a',
//       appID: 'wx5a5acb2fa67f3138',
//       appSecret: '69e017fdbd972eef91b032651d00bb6b',
//       token: 'www99114com',
//       getAccessToken: function () {
//       //通过这个来实现获取access_token
//           return util.readFileAsync(wechat_file)
//       },
//       saveAccessToken: function (data) {
//           data = JSON.stringify(data)
//           //通过这个来保存access_token
//           return util.writeFileAsync(wechat_file,data)
//       }
//   }
// }

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// app.use(wechat(config.wechat))//调用中间件，来实现里面的微信逻辑
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())



// //填入自己的appid
// var appId='wx5a5acb2fa67f3138';

// //填入自己的appSecret
// var appSecret='69e017fdbd972eef91b032651d00bb6b';

// const wxapi=require('./wechat/index')(appId,appSecret);

// (async ()=> {
//     /** */
//     var access = await wxapi.getAccessToken();
//     console.log(`access-token:${access}`);
//     /** */
//     var jstoken = await wxapi.getJsapiTicket();
//     console.log(`js-token:${jstoken}`);

//     var signature = await wxapi.createSignature('www.moke.com');
//     console.log(`signature:${JSON.stringify(signature) }`);

//     var authUrl = wxapi.createAuthUrl('www.moke.com')
//     console.log(`authUrl:${authUrl}`);
// })();



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
