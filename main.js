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
        fs.readdir('./data', function(error, filelist){
          console.log(filelist) // 파일 리스트 목록으로 출력
          var title = "WEL COME";
          var description = "HELLO Node.js"

          var list = '<ul>'
          var i = 0;
          while(i < filelist.length){
            list  = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            <style>
            ul{
              background-color: rgb(207, 214, 214);
              width: 150px;
              list-style-type: none;
              margin: 0;
              padding: 0;
            }
            li a{
                display: block;
                color: #000000;
                padding: 8px;
                text-decoration: none;
                font-weight: bold;
            }
            
            li a.current{
                background-color: rgb(195, 255, 134);
                color: white;
            }
            li a:hover:not(.current){
                background-color: blue;
                color: white;
            }
          </style>
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <class="current">
                ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template); //접속 url에 따라 파일을 정해줌
          });
    } else {
      fs.readdir('./data', function(error, filelist){
        console.log(filelist)
        var title = queryData.id;

        // var list = `<li><a href="/?id=HTML">HTML</a></li>
        // <li><a href="/?id=CSS">CSS</a></li>
        // <li><a href="/?id=JavaScript">JavaScript</a></li>`

        var list = '<ul>'
        var i = 0;
        while(i < filelist.length){
          list  = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ul>'
        fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          <style>
          ul{
            background-color: rgb(207, 214, 214);
            width: 150px;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          li a{
              display: block;
              color: #000000;
              padding: 8px;
              text-decoration: none;
              font-weight: bold;
          }
          
          li a.current{
              background-color: rgb(195, 255, 134);
              color: white;
          }
          li a:hover:not(.current){
              background-color: blue;
              color: white;
          }
        </style>
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <class="current">
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template); //접속 url에 따라 파일을 정해줌
        });
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