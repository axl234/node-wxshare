
const router = require('koa-router')()
const { appId, appSecret } = require('../config/index')
const url = require('url');
const wxapi = require('../wechat/index')(appId,appSecret);
// const util = require('../libs/util')
router.get('/', async (ctx, next) => {
     /** */
   var access = await wxapi.getAccessToken();
   console.log(`access-token:${access}`);
   /** */
   var jstoken = await wxapi.getJsapiTicket();
   console.log(`js-token:${jstoken}`);
  // console.log(url.parse(ctx.request.url).protocol)
  // console.log(url.parse(ctx.request.url).hostname)
  // console.log(ctx.url)
  // console.log(ctx.path)
  console.log(ctx.href)
   var signature = await wxapi.createSignature(ctx.href);
   console.log(`signature:${JSON.stringify(signature) }`);

   var authUrl = wxapi.createAuthUrl(ctx.href)
   console.log(`authUrl:${authUrl}`);
  // ctx.body = {
  //   appId: appId,
  //   timestamp: signature.timestamp,
  //   nonceStr: signature.nonceStr,
  //   signature: signature.signature
  // }
  var title = '回家是一件幸福的事';
  var desc = '我们看完电影，记得的可能是一个画面，一段台词，一段表演，就把他们串起来，看到这些，你或许可以把你看这部电影的感情、经历找回来';
  var imgUrl = `${ctx.protocol}://${ctx.host}/images/icon.jpg` 
  await ctx.render('index', {
    title: title,
    desc: desc,
    imgUrl: imgUrl,
    appId: signature.appid,
    timestamp: signature.timestamp,
    nonceStr: signature.noncestr,
    signature: signature.signature
  })
})

router.get('/getWxConfig', async (ctx, next) => {
   /** */
   var access = await wxapi.getAccessToken();
   console.log(`access-token:${access}`);
   /** */
   var jstoken = await wxapi.getJsapiTicket();
   console.log(`js-token:${jstoken}`);

   var signature = await wxapi.createSignature('http://top.irddtest.com/');
   console.log(`signature:${JSON.stringify(signature) }`);

  //  var authUrl = wxapi.createAuthUrl('www.moke.com')
  //  console.log(`authUrl:${authUrl}`);
  ctx.body = {
    appId: appId,
    timestamp: signature.timestamp,
    noncestr: signature.noncestr,
    signature: signature.signature
  }
})
// router.get('/getMp4', async (ctx, next) => {
//   await util.readBigFileEntry(__dirname+'/reslove.mp4', ctx.res)
// });
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
