const express = require('express');
// const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express();

app.use(express.static('./app'));

/*app.use(createProxyMiddleware('/api', {
  target: 'https://tmpl-ex-1-editor-back.herokuapp.com',
  pathRewrite: {
    "^/api": "/tmpled"
  },
  changeOrigin: true,
  secure: true
}));*/

app.listen(4200);
