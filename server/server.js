var express =require( 'express')
var bodyParser =require('body-parser')
var cookieParser =require('cookie-parser')
var models =require('./model')
var path =require( 'path')
// import React from 'react'
// import csshook from 'css-modules-require-hook/preset'
// import assethook from 'asset-require-hook'
// assethook({
//   extensions: ['png']
// })
// import {renderToString} from 'react-dom/server'
// import { Provider } from 'react-redux'
// import { StaticRouter } from 'react-router-dom'
// import { createStore,applyMiddleware,compose } from 'redux'
// import thunk from 'redux-thunk'


// import App from '../src/App.js'
// import redurces from '../src/redux/redurces'
// import staticPath from '../build/asset-manifest.json'


const Chat = models.getModel('chat');
var app = express();
// Chat.remove({},()=>{

// })
const server = require('http').Server(app)
const io =require('socket.io')(server)


io.on('connection',function(socket){
  socket.on('sendmsg',function(data){
    console.log(data)
    const {from,to,msg} = data;
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg,create_time:new Date().getTime()},function(err,doc){
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
    
  })
})

const userRouter = require('./user');

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
      return next()
  }
  // let store = createStore(redurces,compose(
  //   applyMiddleware(thunk)
  // ))
  // let context = {}
  // const markup = renderToString(
  //   (
  //     <Provider store={store}>
  //         <StaticRouter location={req.url} contex={context}>
  //           <App />
  //         </StaticRouter>
  //     </Provider>
  //   )
  // )

  // const pageHtml = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //     <meta name="theme-color" content="#000000">
  //     <title>React App</title>
  //     <link rel="stylesheet" href="/${staticPath['main.css']}">
  //   </head>
  //   <body>
  //     <noscript>
  //       You need to enable JavaScript to run this app.
  //     </noscript>
  //     <div id="root">${markup}</div>
  //     <script src="/${staticPath['main.js']}"></script>
  //   </body>
  // </html>
  // `
  // return res.send(pageHtml);
  return res.sendFile(path.resolve('../build/index.html'))
})
app.use('/',express.static(path.resolve('../build')))

server.listen(9093, function () {
  console.log(`http://localhost:9093`);
});