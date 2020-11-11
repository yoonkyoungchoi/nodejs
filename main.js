var http = require('http');
var fs = require('fs');
var url = require('url'); // require 요구하다

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname
    
    if(pathname === '/'){
      if(queryData.id === undefined){
        var title = "WEL COME";
        var description = "HELLO Node.js"
        fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template); //접속 url에 따라 파일을 정해줌
        });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template); //접속 url에 따라 파일을 정해줌
      });
    }
    }else{
    response.writeHead(404);
      response.end('Not found');
  }
    // console.log(url.parse(_url, true).pathname) 현재 상태 출력
    // console.log(__dirname + url); //cmd 경로 확인 가능
});

app.listen(3000);